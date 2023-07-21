import '@remix-run/node'

import { type ServerTiming } from '~/server/infra/serverTiming.ts'

interface Context {
	cspNonce: string
	serverTiming: ServerTiming
}

declare module '@remix-run/node' {
	interface LoaderArgs extends DataFunctionArgs, Context {}

	interface ActionArgs extends DataFunctionArgs, Context {}

	interface AppLoadContext extends Context {}
}
