import fs from 'fs'
import { writeFile } from 'fs/promises'
import { glob } from 'glob'
import { type Options, defineConfig } from 'tsup'

import {
	excludeVendorFromSourceMapPlugin,
	nativeNodeModulesPlugin,
} from './scripts/esbuildPlugins'

type App = 'prod' | 'dev'
type Config = {
	watch: boolean
	minify: boolean
	entrypoints: {
		paths: string[]
		ignore: string[]
	}
}
type BuildConfig = Record<App, Config>

const getConfig = (app: App): Config => {
	const config: BuildConfig = {
		prod: {
			watch: false,
			minify: true,
			entrypoints: {
				paths: ['src/**/*.ts'],
				ignore: ['src/**/*.d.ts'],
			},
		},
		dev: {
			watch: false,
			minify: false,
			entrypoints: {
				paths: ['src/**/*.ts'],
				ignore: ['src/**/*.d.ts'],
			},
		},
	}

	return config[app]
}

export default defineConfig(async (opts) => {
	const app = (process.env.APP ?? 'prod') as App
	const config = getConfig(app)
	const entry = await glob(config.entrypoints.paths, {
		ignore: config.entrypoints.ignore,
	})

	const cjsConfig = {
		clean: !opts.watch,
		dts: false,
		format: ['cjs'],
		minify: true,
		outDir: 'dist/cjs',
		treeshake: true,
		splitting: true,
		target: 'esnext',
		entry,
		plugins: [nativeNodeModulesPlugin, excludeVendorFromSourceMapPlugin],
		sourcemap: true,
		external: getExternal(),
	} satisfies Options

	const esmConfig = {
		clean: !opts.watch,
		dts: true,
		format: ['esm'],
		minify: true,
		outDir: 'dist/esm',
		treeshake: true,
		splitting: true,
		target: 'esnext',
		entry,
		plugins: [nativeNodeModulesPlugin],
		sourcemap: false,
		external: getExternal(),
		async onSuccess() {
			const packageJson = getPackageJson()
			packageJson.exports = {
				'./package.json': './package.json',
			}

			entry.forEach((e) => {
				const file = e.replace('src/', '').replace('.ts', '')
				packageJson.exports[`./${file}`] = {
					types: `./dist/esm/${file}.d.mts`,
					require: `./dist/cjs/${file}.js`,
					import: `./dist/esm/${file}.mjs`,
					default: `./${e}`,
				}
			})

			await writeFile('./package.json', JSON.stringify(packageJson, null, 2))
		},
	} satisfies Options

	return app === 'dev' ? [esmConfig] : [cjsConfig, esmConfig]
})

type PackageJson = {
	name: string
	exports: Record<
		string,
		| { import: string; types: string; default: string; require: string }
		| { import: string; types: string; default: string }
		| string
	>
	typesVersions: Record<'*', Record<string, string[]>>
	files: string[]
	dependencies: Record<string, string>
	devDependencies: Record<string, string>
}

function getExternal() {
	const packageJson = getPackageJson()

	// no node apis; safe to bundle
	const included = ['kysely', 'postgres', 'react-dom', '@sinclair/typebox']

	// with node apis
	const excluded = ['pg-native', 'hiredis', 'oas-validator']

	const external = [
		...Object.keys(packageJson.dependencies),
		// include devdependencies since dynamically importing dev-dependencies in code forces esbuild to create a chunk for that dev-dependency instead of pulling from node_modules
		...Object.keys(packageJson.devDependencies),
	]
		.filter((deps) => !deps.startsWith('@org/'))
		.filter((dep) => !included.includes(dep))
		.concat(excluded)

	return external
}

function getPackageJson() {
	return JSON.parse(fs.readFileSync('./package.json', 'utf-8')) as PackageJson
}
