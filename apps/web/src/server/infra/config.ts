import { type Static, Type, type TObject } from '@sinclair/typebox'
import envSchema from 'env-schema'
import {
	APP_ENV,
	type App_env,
	NODE_ENV,
	PORT,
} from '~/shared/schemas/index.ts'

import {
	type OverloadProtectionOpts,
	getOverloadProtectionOpts,
	overloadProtectionEnvSchema,
} from '../middleware/overloadProtection.ts'
import {
	cloudRunLoggerOptsEnvSchema,
	type CloudRunLoggerOpts,
} from './logger/cloudRunLoggerOpts.ts'
import { payloadEnvSchema } from './payload/index.ts'
import { remixEnvSchema } from './remix/index.ts'

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
	...remixEnvSchema,
	...overloadProtectionEnvSchema,
	...payloadEnvSchema,
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
	server: {
		port: number
	}
	loggerOpts: CloudRunLoggerOpts
	remix: {
		buildPath: string
	}
	payload: {
		secret: string
		mongoURL: string
		local: boolean
	}
} & OverloadProtectionOpts

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
		},
		loggerOpts: {
			APP_NAME: env.APP_NAME,
			APP_VERSION: env.APP_VERSION,
			NODE_ENV: env.NODE_ENV,
			LOGGING_LEVEL: env.LOGGING_LEVEL,
			K_SERVICE: env.K_SERVICE,
		},
		remix: {
			buildPath: env.REMIX_BUILD_PATH,
		},
		overloadProtection: getOverloadProtectionOpts(env),
		payload: {
			secret: env.PAYLOAD_SECRET,
			mongoURL: env.MONGODB_URI,
			local: false,
		},
	}
}

/*
 *This is the default config using the default typebox schema
 */
const env = getEnv<Env>(typeboxEnvSchema)
export const config = mapEnvToConfig(env)
