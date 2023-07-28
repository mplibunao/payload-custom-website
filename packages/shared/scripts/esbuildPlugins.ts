import { type Plugin } from 'esbuild'
import fs from 'fs'
import { createRequire as topLevelCreateRequire } from 'module'
import path from 'path'

const require = topLevelCreateRequire(import.meta.url)

// https://github.com/evanw/esbuild/issues/1685
// exclude js files from node_modules from sourcemap
// js because we want sourcemaps for internal packages (ts)

export const excludeVendorFromSourceMapPlugin = {
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
export const nativeNodeModulesPlugin = {
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
