import { type RequestHandler, createRequestHandler } from '@remix-run/express'
import { broadcastDevReady, type ServerBuild } from '@remix-run/node'
import { Type } from '@sinclair/typebox'
import { type Request, type Response, type Express } from 'express'

import { type Config } from '../config.server.ts'
import { ServerTiming } from '../serverTiming.ts'

export const remixEnvSchema = {
	REMIX_BUILD_PATH: Type.String({ default: '../build/index.js' }),
}

export function createRemixRequestHandler({
	build,
	config,
	app,
}: {
	build: ServerBuild
	config: Config
	app: Express
}): RequestHandler {
	function getLoadContext(req: Request, _res: Response) {
		return {
			serverTiming: new ServerTiming(),
			logger: app.locals.logger,
			payload: app.locals.payload,
			config: config,
			siteInfo: req.siteInfo,
		}
	}

	return createRequestHandler({
		build,
		mode: config.env.NODE_ENV,
		getLoadContext,
	})
}

/*
 *Create a request handler that watches for changes to the server build during development.
 *See the folliwng for more info:
 * - https://www.youtube.com/watch?v=zTrjaUt9hLo
 * - https://remix.run/docs/en/main/guides/manual-mode
 */
export async function createDevRequestHandler({
	build,
	config,
	buildPath,
	app,
}: {
	build: ServerBuild
	config: Config
	buildPath: string
	app: Express
}): Promise<RequestHandler> {
	function handleServerUpdate() {
		// 1. re-import the server build
		build = reimportServer(buildPath)
		// 2. tell dev server that this app server is now up-to-date and ready
		broadcastDevReady(build)
	}

	const { default: chokidar } = await import('chokidar')
	chokidar
		.watch(buildPath, { ignoreInitial: true })
		.on('add', handleServerUpdate)
		.on('change', handleServerUpdate)

	// wrap request handler to make sure its recreated with the latest build for every request
	return async (req, res, next) => {
		try {
			return createRemixRequestHandler({ build, config, app })(req, res, next)
		} catch (error) {
			next(error)
		}
	}
}

// CJS require cache busting
function reimportServer(BUILD_PATH: string): ServerBuild {
	// 1. manually remove the server build from the require cache
	Object.keys(require.cache).forEach((key) => {
		if (key.startsWith(BUILD_PATH)) {
			delete require.cache[key]
		}
	})

	// 2. re-import the server build
	return require(BUILD_PATH) as unknown as ServerBuild
}
