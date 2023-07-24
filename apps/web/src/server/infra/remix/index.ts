import { type RequestHandler, createRequestHandler } from '@remix-run/express'
import { broadcastDevReady, type ServerBuild } from '@remix-run/node'
import { Type } from '@sinclair/typebox'
import { type Request, type Response } from 'express'

import { type Config } from '../config.ts'
import { ServerTiming } from '../serverTiming.ts'

export const remixEnvSchema = {
	REMIX_BUILD_PATH: Type.String({ default: '../../build/index.js' }),
}

export function createRemixRequestHandler(
	build: ServerBuild,
	config: Config,
): RequestHandler {
	function getLoadContext(_: Request, res: Response) {
		return { cspNonce: res.locals.cspNonce, serverTiming: new ServerTiming() }
	}

	return createRequestHandler({
		build,
		mode: config.env.NODE_ENV,
		getLoadContext,
	})
}

/*
 *Create a request handler that watches for changes to the server build during development.
 *See the ff for more info:
 * - https://www.youtube.com/watch?v=zTrjaUt9hLo
 * - https://remix.run/docs/en/main/guides/manual-mode
 */
export async function createDevRequestHandler(
	build: ServerBuild,
	config: Config,
	BUILD_PATH: string,
): Promise<RequestHandler> {
	function handleServerUpdate() {
		// 1. re-import the server build
		import(`${BUILD_PATH}?t=${Date.now()}`)
			.then((res: ServerBuild) => {
				build = res
				// 2. tell dev server that this app server is now up-to-date and ready
				broadcastDevReady(build)
			})
			.catch((err) => {
				console.log('Something went wrong re-importing the server build', err)
			})
	}

	const { default: chokidar } = await import('chokidar')
	chokidar
		.watch(BUILD_PATH, { ignoreInitial: true })
		.on('add', handleServerUpdate)
		.on('change', handleServerUpdate)

	// wrap request handler to make sure its recreated with the latest build for every request
	return async (req, res, next) => {
		try {
			return createRemixRequestHandler(build, config)(req, res, next)
		} catch (error) {
			next(error)
		}
	}
}
