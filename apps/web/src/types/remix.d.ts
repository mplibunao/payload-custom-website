import '@remix-run/node'

import { type Express } from 'express'
import { type ServerTiming } from '~/server/infra/serverTiming.ts'

interface Context extends Express.Locals {
	serverTiming: ServerTiming
}

declare module '@remix-run/node' {
	interface LoaderArgs extends DataFunctionArgs, Context {}

	interface ActionArgs extends DataFunctionArgs, Context {}

	interface AppLoadContext extends Context {}
}
