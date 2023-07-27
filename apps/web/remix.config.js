import { flatRoutes } from 'remix-flat-routes'

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
export default {
	appDirectory: 'src/app',
	ignoredRouteFiles: ['**/*'],
	serverModuleFormat: 'esm',
	serverPlatform: 'node',
	tailwind: true,
	postcss: true,
	// add paths outside of appDirectory to watchPaths so we get hmr/hdr
	watchPaths: ['./tailwind.config.ts'],
	future: {
		v2_headers: true,
		v2_meta: true,
		v2_errorBoundary: true,
		v2_normalizeFormMethod: true,
		v2_routeConvention: true,
		v2_dev: true,
	},
	serverDependenciesToBundle: [
		//'@sinclair/typebox',
		//'react-dom',
		//'@remix-run/css-bundle',
		//'@remix-run/router',
		//'@remix-run/server-runtime',
		//'class-variance-authority',
		//'confetti-react',
		//'isbot',
		//'tailwind-merge',
		//'remix-utils',
	],
	serverMinify: true,
	routes: async (defineRoutes) => {
		return flatRoutes('routes', defineRoutes, {
			appDir: 'src/app',
			ignoredRouteFiles: [
				'.*',
				'**/*.css',
				'**/*.test.{js,jsx,ts,tsx}',
				'**/__*.*',
			],
		})
	},
}
