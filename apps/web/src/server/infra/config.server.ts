import dotenv from 'dotenv'
import { type ZodFormattedError, z } from 'zod'
import {
	type SiteEnv,
	SiteEnvSchema,
} from '~/app/modules/site/siteEnv.server.ts'
import {
	APP_ENV,
	type App_env,
	NODE_ENV,
	PORT,
	SERVER_URL,
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
import { type PayloadConfig, payloadEnvSchema } from './payload/index.ts'
import { remixEnvSchema } from './remix/index.ts'

/*
 *ZOD ENV SCHEMAS
 *Object version (No z.object()) allows us to extend the env for other usage outside of serving requests like scripts
 *Import this if you want to add other env variables
 */
export const baseZodEnvSchema = {
	...cloudRunLoggerOptsEnvSchema,
	...remixEnvSchema,
	...overloadProtectionEnvSchema,
	...payloadEnvSchema,
	...SiteEnvSchema,
	NODE_ENV,
	APP_ENV,
	PORT,
	PAYLOAD_PUBLIC_SERVER_URL: SERVER_URL,
}

/*
 *This is the default env schema for normal usage
 */
const zodEnvSchema = z.object(baseZodEnvSchema)

export type Env = z.infer<typeof zodEnvSchema>

/*
 *DOTENV + ZOD ENV SCHEMAS = ENV
 */
export const getDotEnv = () => {
	if (Boolean(process.env.CI) || process.env.APP_ENV === 'production') {
		return process.env
	}

	if (process.env.APP_ENV === 'test') {
		return dotenv.config({ path: '.env.test' }).parsed
	}

	return dotenv.config().parsed
}

export const getEnv = () => {
	const env = getDotEnv()
	const validatedEnv = zodEnvSchema.safeParse(env)
	if (!validatedEnv.success) {
		console.error(
			'❌ Invalid environment variables:\n',
			...formatErrors(validatedEnv.error.format()),
		)
		throw new Error('Invalid environment variables')
	}

	return validatedEnv.data
}

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
} & OverloadProtectionOpts &
	PayloadConfig &
	SiteEnv

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
			mongoOptions: {
				//dbName: 'test',
				appName: env.APP_NAME,
				family: 4,
				heartbeatFrequencyMS: env.MONGODB_HEARTBEAT_FREQUENCY_MS,
				//authSource: 'admin',
				socketTimeoutMS: env.MONGODB_SOCKET_TIMEOUT_MS,
			},
		},
		site: {
			title: env.PAYLOAD_PUBLIC_SITE_TITLE,
			description: env.PAYLOAD_PUBLIC_SITE_DESCRIPTION,
		},
	}
}

/*
 *This is the default config using the default zod schema
 */
const env = getEnv()
export const config = mapEnvToConfig(env)

export function formatErrors(
	errors: ZodFormattedError<Map<string, string>, string>,
) {
	return Object.entries(errors)
		.map(([name, value]) => {
			if (value && '_errors' in value)
				return `${name}: ${value._errors.join(', ')}\n`

			return null
		})
		.filter(Boolean)
}
