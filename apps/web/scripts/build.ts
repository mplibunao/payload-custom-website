import esbuild from 'esbuild'
import fs from 'fs'
import { glob } from 'glob'
import minimist from 'minimist'

import {
	excludeVendorFromSourceMapPlugin,
	nativeNodeModulesPlugin,
} from './esbuildPlugins.ts'

/*
 *Usage: node ./esbuild.script.js --app prod
 *
 *Options:
 *	-a  --app <app-type> App type to build. For entrypoint configuration so we don't have to pass everything as node args
 *											 Options: `prod`
 *											 Default: `prod`
 *  -w  --watch          Start in watch mode
 *                       Default: false
 */

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
				paths: ['src/server/index.ts'],
				ignore: [],
			},
		},
		dev: {
			watch: false,
			minify: true,
			entrypoints: {
				paths: ['src/server/index.ts'],
				ignore: [],
			},
		},
	}

	return config[app]
}

const argv = minimist(process.argv.slice(2))
const app = (argv.a || argv.app || 'prod') as App
const watch = (argv.w || argv.watch || false) as boolean

const config = getConfig(app)
const entryPoints = await glob([
	...config.entrypoints.paths,
	...config.entrypoints.ignore,
])

try {
	const context = await esbuild.context({
		entryPoints,
		outdir: 'dist',
		target: ['esnext'],
		platform: 'node',
		sourcemap: true,
		format: 'esm',
		logLevel: 'info',
		minify: config.minify,
		splitting: true,
		bundle: true,
		color: true,
		metafile: true,
		sourcesContent: false,
		treeShaking: true,
		external: getExternal(),
		plugins: [nativeNodeModulesPlugin, excludeVendorFromSourceMapPlugin],
	})

	if (watch) {
		await context.watch()
	} else {
		await context.rebuild()
		await context.dispose()
		process.exit(0)
	}
} catch (error) {
	console.error(error)
}

function getExternal() {
	const packageJson = JSON.parse(
		fs.readFileSync('./package.json', 'utf-8'),
	) as PackageJson

	// no node apis; safe to bundle
	const included = [
		'kysely',
		'postgres',
		'regexparam',
		'react-dom',
		'@sinclair/typebox',
		'@vercel/edge-config',

		'@remix-run/css-bundle',
		'@remix-run/router',
		'@remix-run/server-runtime',
		'class-variance-authority',
		'isbot',
		'tailwind-merge',
		'remix-utils',
	]

	// with node apis
	const excluded = [
		'pg-native',
		'hiredis',
		'oas-validator',

		/*
		 *Dev dependencies are not included in external by default
		 *so we need to add those that use node apis manually or move them to dependencies
		 */
		'fastify-print-routes',
		'preview-email',
	]

	const external = [
		...Object.keys(packageJson.dependencies),
		// include devdependencies since dynamically importing dev-dependencies in code forces esbuild to create a chunk for that dev-dependency instead of pulling from node_modules
		...Object.keys(packageJson.devDependencies),
	]
		.filter((deps) => !deps.startsWith('@org/'))
		.filter((dep) => !included.includes(dep))
		.concat(excluded)
	console.info(external, 'external')

	return external
}

export type PackageJson = {
	name: string
	dependencies: Record<string, string>
	devDependencies: Record<string, string>
}
