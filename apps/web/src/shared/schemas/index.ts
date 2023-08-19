import { z } from 'zod'

export const NODE_ENV = z
	.union([z.literal('development'), z.literal('production'), z.literal('test')])
	.default('development')

export const APP_ENV = z
	.union([z.literal('development'), z.literal('production'), z.literal('test')])
	.default('production')

export type App_env = z.infer<typeof APP_ENV>

export const PORT = z.coerce
	.number()
	.int()
	.nonnegative()
	.lte(65535)
	.default(3000)
export const id = z.string().uuid()
export const SERVER_URL = z.string()
