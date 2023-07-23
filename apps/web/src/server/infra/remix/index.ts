import { type RequestHandler, createRequestHandler } from '@remix-run/express'
import { broadcastDevReady, type ServerBuild } from '@remix-run/node'
import { type Request, type Response } from 'express'
import path from 'path'
import { BUILD_PATH } from '~/shared/constants/hmr.ts'
import { getDirname } from '~/shared/esm.ts'

import { type Config } from '../config.ts'
import { ServerTiming } from '../serverTiming.ts'

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
export function createDevRequestHandler(
	build: ServerBuild,
	config: Config,
): RequestHandler {
	async function handleServerUpdate() {
		// 1. re-import the server build
		build = (await import(`${BUILD_PATH}?t=${Date.now()}`)) as ServerBuild
		// 2. tell dev server that this app server is now up-to-date and ready
		broadcastDevReady(build)
	}

	const dirname = getDirname(import.meta.url)
	const watchPath = path.join(dirname, BUILD_PATH).replace(/\\/g, '/')

	// use .then instead of making function async because RequestHandler type then app.all type breaks vs js eslint errors
	import('chokidar')
		.then((res) => {
			res.default
				.watch(watchPath, { ignoreInitial: true })
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				.on('add', handleServerUpdate)
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				.on('change', handleServerUpdate)
		})
		.catch((err) => {
			console.log('Error encountered listening to hmr changes', err)
		})

	// wrap request handler to make sure its recreated with the latest build for every request
	return async (req, res, next) => {
		try {
			return createRemixRequestHandler(build, config)(req, res, next)
		} catch (error) {
			next(error)
		}
	}
}
