import { Type } from '@sinclair/typebox'
import { type Express } from 'express'
import payload from 'payload'
import { type InitOptions } from 'payload/config'

import { type Config } from './config'

export const payloadEnvSchema = {
	PAYLOAD_SECRET: Type.String(),
	MONGODB_URI: Type.String(),
}

export const initPayloadCms = async (app: Express, config: Config) => {
	const initConfig: InitOptions = {
		...config.payload,
		express: app,
	}

	if (!config.payload.local) {
		initConfig.onInit = (payload) => {
			payload.logger.info(`Started Payload Admin at ${payload.getAdminURL()}`)
		}
	}

	return payload.init(initConfig)
}
