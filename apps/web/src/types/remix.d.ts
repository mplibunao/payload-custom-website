import '@remix-run/node'

import { type Payload } from 'payload'
import { type Logger } from 'pino'
import { type SiteInfo } from '~/app/modules/site/site.repository.server'
import { type Config } from '~/server/infra/config.server'
import { type ServerTiming } from '~/server/infra/serverTiming.ts'

interface Context {
	serverTiming: ServerTiming
	logger: Logger
	payload: Payload
	config: Config
	siteInfo: SiteInfo
}

declare module '@remix-run/node' {
	interface LoaderArgs extends DataFunctionArgs, Context {}

	interface ActionArgs extends DataFunctionArgs, Context {}

	interface AppLoadContext extends Context {}
}
