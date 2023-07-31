import '@remix-run/node'

import { type Payload } from 'payload'
import { type Logger } from 'pino'
import { type ServerTiming } from '~/server/infra/serverTiming.ts'

interface Context {
	serverTiming: ServerTiming
	logger: Logger
	Payload: Payload
}

declare module '@remix-run/node' {
	interface LoaderArgs extends DataFunctionArgs, Context {}

	interface ActionArgs extends DataFunctionArgs, Context {}

	interface AppLoadContext extends Context {}
}
