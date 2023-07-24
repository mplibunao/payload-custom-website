import esbuild from 'esbuild'
import fs from 'fs'
import { globby } from 'globby'
import minimist from 'minimist'

import {
	excludeVendorFromSourceMapPlugin,
	nativeNodeModulesPlugin,
} from './esbuildPlugins'

/*
 *Usage: node ./esbuild.script.js --app prod
 *
 *Options:
 *	-a  --app <app-type> App type to build. For entrypoint configuration so we don't have to pass everything as node args
 *											 Options: `prod`
 *											 Default: `prod`
 */

type App = 'prod'
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
			minify: false,
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
const config = getConfig(app)
const entryPoints = await globby([
	...config.entrypoints.paths,
	...config.entrypoints.ignore,
])

esbuild
	.build({
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
	.catch((error: unknown) => {
		console.error(error)
		process.exit(1)
	})

function getExternal() {
	const packageJson = JSON.parse(
		fs.readFileSync('./package.json', 'utf-8'),
	) as PackageJson

	// no node apis; safe to bundle
	const included = [
		'kysely',
		'postgres',
		'regexparam',
		'react',
		'@sinclair/typebox',
		'@vercel/edge-config',

		// from script
		'@remix-run/css-bundle',
		'@remix-run/react',
		'@remix-run/router',
		'@remix-run/server-runtime',
		'class-variance-authority',
		'confetti-react',
		'isbot',
		'tailwind-merge',
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

	const external = [...Object.keys(packageJson.dependencies)]
		.filter((deps) => !deps.startsWith('@findmyparking/'))
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
