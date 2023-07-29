import { getDotEnv } from '@org/shared/config'
import {
	cloudRunLoggerOptsEnvSchema,
	type CloudRunLoggerOpts,
} from '@org/shared/logger/cloudRunLoggerOpts'
import {
	type ExpressLazyMiddlewareConfig,
	lazyMiddlewareEnvSchema,
} from '@org/shared/middleware/lazyLoad'
import {
	type OverloadProtectionOpts,
	overloadProtectionEnvSchema,
	getOverloadProtectionOpts,
} from '@org/shared/middleware/overloadProtection'
import {
	NODE_ENV,
	APP_ENV,
	PORT,
	type App_env,
} from '@org/shared/schemas/index'
import { Type, type Static, type TObject } from '@sinclair/typebox'
import envSchema from 'env-schema'
import overload from 'overload-protection'

import { type PayloadConfigOpts, payloadEnvSchema } from './payload/init'

/*
 *DOTENV + TYPEBOX ENV SCHEMAS = ENV
 */
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
	...overloadProtectionEnvSchema,
	...payloadEnvSchema,
	...lazyMiddlewareEnvSchema,
	NODE_ENV,
	APP_ENV,
	PORT,
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
	loggerOpts: CloudRunLoggerOpts
	server: {
		port: number
	} & ExpressLazyMiddlewareConfig
} & OverloadProtectionOpts &
	PayloadConfigOpts

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
			stripTrailingSlash: env.STRIP_TRAILING_SLASH,
			redirectHttpToHttps: env.REDIRECT_HTTP_TO_HTTPS,
		},
		loggerOpts: {
			APP_NAME: env.APP_NAME,
			APP_VERSION: env.APP_VERSION,
			NODE_ENV: env.NODE_ENV,
			LOGGING_LEVEL: env.LOGGING_LEVEL,
			K_SERVICE: env.K_SERVICE,
		},
		overloadProtection: overload('express', getOverloadProtectionOpts(env)),
		payload: {
			secret: env.PAYLOAD_SECRET,
			mongoURL: env.MONGODB_URI,
			local: true,
		},
	}
}

/*
 *This is the default config using the default typebox schema
 */
const env = getEnv<Env>(typeboxEnvSchema)
export const config = mapEnvToConfig(env)
