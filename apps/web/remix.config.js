const { routeExtensions } = require('remix-custom-routes')
const path = require('path')
/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
	appDirectory: 'src/app',
	serverModuleFormat: 'cjs',
	serverPlatform: 'node',
	tailwind: true,
	postcss: true,
	// add paths outside of appDirectory to watchPaths so we get hmr/hdr
	watchPaths: ['./tailwind.config.js'],
	future: {
		v2_headers: true,
		v2_meta: true,
		v2_errorBoundary: true,
		v2_normalizeFormMethod: true,
		v2_routeConvention: true,
		v2_dev: true,
	},
	serverMinify: true,
	routes: async (_defineRoutes) => {
		const appDirectory = path.join(__dirname, 'src/app')

		return routeExtensions(appDirectory)
	},
}
