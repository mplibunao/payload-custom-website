import esbuild, { type Plugin } from 'esbuild'
import fs from 'fs'
import minimist from 'minimist'
import path from 'path'

type App = 'prod'
type Config = {
	watch: boolean
	minify: boolean
	entrypoints: string[]
}
type BuildConfig = Record<App, Config>

const getConfig = (app: App): Config => {
	const config: BuildConfig = {
		prod: {
			watch: false,
			minify: true,
			entrypoints: ['../src/server/index.ts'],
		},
	}

	return config[app]
}

const argv = minimist(process.argv.slice(2))
const app = (argv.a || argv.app) as App
const config = getConfig(app)

esbuild
	.build({
		entryPoints: config.entrypoints,
		outdir: 'server-build',
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
		plugins: getPlugins(),
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
		'pino',

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

function getPlugins(): Plugin[] {
	return [nativeNodeModulesPlugin, excludeVendorFromSourceMapPlugin]
}

// https://github.com/evanw/esbuild/issues/1685
// exclude js files from node_modules from sourcemap
// js because we want sourcemaps for internal packages (ts)
const excludeVendorFromSourceMapPlugin = {
	name: 'excludeVendorFromSourceMap',
	setup(build) {
		build.onLoad({ filter: /node_modules/ }, (args) => {
			if (args.path.endsWith('.js')) {
				return {
					contents:
						fs.readFileSync(args.path, 'utf8') +
						'\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIiJdLCJtYXBwaW5ncyI6IkEifQ==',
					loader: 'default',
				}
			}

			return
		})
	},
} satisfies Plugin

// https://github.com/egoist/tsup/blob/dev/src/esbuild/native-node-module.ts
// original from https://github.com/evanw/esbuild/issues/1051#issuecomment-806325487
// forgot exact issue but I think this fixes issues with some packages
const nativeNodeModulesPlugin = {
	name: 'native-node-modules',
	setup(build) {
		// If a ".node" file is imported within a module in the "file" namespace, resolve
		// it to an absolute path and put it into the "node-file" virtual namespace.
		build.onResolve({ filter: /\.node$/, namespace: 'file' }, (args) => {
			const resolvedId = require.resolve(args.path, {
				paths: [args.resolveDir],
			})
			if (resolvedId.endsWith('.node')) {
				return {
					path: resolvedId,
					namespace: 'node-file',
				}
			}
			return {
				path: resolvedId,
			}
		})

		// Files in the "node-file" virtual namespace call "require()" on the
		// path from esbuild of the ".node" file in the output directory.
		build.onLoad({ filter: /.*/, namespace: 'node-file' }, (args) => {
			return {
				contents: `
            import path from ${JSON.stringify(args.path)}
            try { module.exports = require(path) }
            catch {}
          `,
				resolveDir: path.dirname(args.path),
			}
		})

		// If a ".node" file is imported within a module in the "node-file" namespace, put
		// it in the "file" namespace where esbuild's default loading behavior will handle
		// it. It is already an absolute path since we resolved it to one above.
		build.onResolve({ filter: /\.node$/, namespace: 'node-file' }, (args) => ({
			path: args.path,
			namespace: 'file',
		}))

		// Tell esbuild's default loading behavior to use the "file" loader for
		// these ".node" files.
		const opts = build.initialOptions
		opts.loader = opts.loader || {}
		opts.loader['.node'] = 'file'
	},
} satisfies Plugin

export type PackageJson = {
	name: string
	dependencies: Record<string, string>
	devDependencies: Record<string, string>
}
