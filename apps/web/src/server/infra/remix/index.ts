import { type RequestHandler, createRequestHandler } from '@remix-run/express'
import { broadcastDevReady, type ServerBuild } from '@remix-run/node'
import { Type } from '@sinclair/typebox'
import { type Request, type Response } from 'express'
import path from 'path'
import { getDirname } from '~/shared/esm.ts'

import { type Config } from '../config.ts'
import { ServerTiming } from '../serverTiming.ts'

export const remixEnvSchema = {
	REMIX_BUILD_PATH: Type.String(),
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
const buildPath = '../../build/index.js'
export async function createDevRequestHandler(
	build: ServerBuild,
	config: Config,
): Promise<RequestHandler> {
	console.info(config.remix.buildPath, 'config.remix.buildPath')
	function handleServerUpdate() {
		// 1. re-import the server build
		//build = (await import(
		//`${buildPath}?t=${Date.now()}`
		//`${config.remix.buildPath}?t=${Date.now()}`
		//)) as ServerBuild
		// 2. tell dev server that this app server is now up-to-date and ready

		import(`${buildPath}?t=${Date.now()}`).then((res: ServerBuild) => {
			build = res
			broadcastDevReady(build)
		})
		//broadcastDevReady(build)
	}

	const { default: chokidar } = await import('chokidar')
	const dirname = getDirname(import.meta.url)
	const watchPath = path
		.join(dirname, config.remix.buildPath)
		.replace(/\\/g, '/')

	chokidar
		.watch(watchPath, { ignoreInitial: true })

		//.on('add', handleServerUpdate)

		//.on('change', handleServerUpdate)
		.on('all', handleServerUpdate)

	// wrap request handler to make sure its recreated with the latest build for every request
	return async (req, res, next) => {
		try {
			return createRemixRequestHandler(build, config)(req, res, next)
		} catch (error) {
			next(error)
		}
	}
}
