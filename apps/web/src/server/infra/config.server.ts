import { type Static } from '@sinclair/typebox'
import dotenv from 'dotenv'
import { type SiteEnv } from '~/app/modules/site/siteEnv.server.ts'
import { type App_env } from '~/shared/schemas/index.ts'
import { envSchema } from '~/shared/validation/compiledAjv.js'

import {
	type OverloadProtectionOpts,
	getOverloadProtectionOpts,
} from '../middleware/overloadProtection.ts'
import { type typeboxEnvSchema } from './configSchema.ts'
import { type CloudRunLoggerOpts } from './logger/cloudRunLoggerOpts.ts'
import { type PayloadConfig } from './payload/index.ts'

export const getDotEnv = () => {
	if (Boolean(process.env.CI) || process.env.APP_ENV === 'production') {
		return process.env
	}

	if (process.env.APP_ENV === 'test') {
		return dotenv.config({
			path: '.env.test',
		}).parsed
	}

	return dotenv.config().parsed
}

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

const env = getDotEnv()

if (!envSchema(env)) {
	// @ts-expect-error
	throw new Error(JSON.stringify(envSchema.errors))
}
export const config = mapEnvToConfig(env as unknown as Env)
