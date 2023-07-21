import { type Static, Type } from '@sinclair/typebox'

export const NODE_ENV = Type.Optional(
	Type.Union([
		Type.Literal('development'),
		Type.Literal('production'),
		Type.Literal('test'),
	]),
)
export const APP_ENV = Type.Union(
	[
		Type.Literal('development'),
		Type.Literal('production'),
		Type.Literal('test'),
	],
	{ default: 'production' },
)
export type App_env = Static<typeof APP_ENV>

export const PORT = Type.Number({ default: 3000, minimum: 0, maximum: 65535 })
export const id = Type.String({ format: 'uuid' })
