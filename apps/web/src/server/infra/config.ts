import { type Static, Type, type TObject } from '@sinclair/typebox'
import envSchema from 'env-schema'
import {
	APP_ENV,
	type App_env,
	NODE_ENV,
	PORT,
} from '~/shared/schemas/index.ts'

import {
	cloudRunLoggerOptsEnvSchema,
	type CloudRunLoggerOpts,
} from './logger/cloudRunLoggerOpts.ts'

/*
 *DOTENV + TYPEBOX ENV SCHEMAS = ENV
 */
export const getDotEnv = () => {
	if (Boolean(process.env.CI) || process.env.APP_ENV === 'production') {
		return false
	}

	if (process.env.APP_ENV === 'test') {
		return {
			path: '.env.test',
		}
	}

	return true
}

export const getEnv = <T>(schema: TObject) => {
	return envSchema<T>({
		dotenv: getDotEnv(),
		schema,
		data: process.env,
	})
}

/*
 *TYPEBOX ENV SCHEMAS
 *Object version (No Type.Object()) allows us to extend the env for other usage outside of serving requests like scripts
 *Import this if you want to add other env variables
 */
export const baseTypeboxEnvSchema = {
	...cloudRunLoggerOptsEnvSchema,
	NODE_ENV,
	APP_ENV,
	PORT,
	STRIP_TRAILING_SLASH: Type.Optional(Type.Boolean({ default: true })),
	REDIRECT_HTTP_TO_HTTPS: Type.Optional(Type.Boolean({ default: false })),
	SESSION_SECRET: Type.String(),
}

/*
 *This is the default env schema for normal usage
 */
const typeboxEnvSchema = Type.Object(baseTypeboxEnvSchema)

export type Env = Static<typeof typeboxEnvSchema>

export type Config<T extends Env = Env> = {
	env: T
	app: {
		version: string
		name: string
		APP_ENV: App_env
	}
	server: {
		port: number
		stripTraillingSlash?: boolean
		redirectHttpToHttps?: boolean
	}
	loggerOpts: CloudRunLoggerOpts
}

export const mapEnvToConfig = <T extends Env = Env>(env: T): Config<T> => {
	return {
		env,
		app: {
			version: env.APP_VERSION,
			name: env.APP_NAME,
			APP_ENV: env.APP_ENV,
		},
		server: {
			port: env.PORT,
			stripTraillingSlash: env.STRIP_TRAILING_SLASH,
			redirectHttpToHttps: env.REDIRECT_HTTP_TO_HTTPS,
		},
		loggerOpts: {
			APP_NAME: env.APP_NAME,
			APP_VERSION: env.APP_VERSION,
			APP_ENV: env.APP_ENV,
			LOGGING_LEVEL: env.LOGGING_LEVEL,
			K_SERVICE: env.K_SERVICE,
		},
	}
}

/*
 *This is the default config using the default typebox schema
 */
const env = getEnv<Env>(typeboxEnvSchema)
export const config = mapEnvToConfig(env)
