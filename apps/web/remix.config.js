const { routeExtensions } = require('remix-custom-routes')
const path = require('node:path')
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
	serverMinify: true,
	routes: async (_defineRoutes) => {
		const appDirectory = path.join(__dirname, 'src/app')

		return routeExtensions(appDirectory)
	},
}
