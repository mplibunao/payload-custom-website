import { type RequestHandler, createRequestHandler } from '@remix-run/express'
import { type ServerBuild } from '@remix-run/node'
import { type Request, type Response } from 'express'

import { type Config } from '../config.ts'
import { ServerTiming } from '../serverTiming.ts'

export function getRequestHandler(
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
