import '@remix-run/node'

import { type Logger } from 'pino'
import { type ServerTiming } from '~/server/infra/serverTiming.ts'

interface Context {
	cspNonce: string
	serverTiming: ServerTiming
	logger: Logger
}

declare module '@remix-run/node' {
	interface LoaderArgs extends DataFunctionArgs, Context {}

	interface ActionArgs extends DataFunctionArgs, Context {}

	interface AppLoadContext extends Context {}
}
