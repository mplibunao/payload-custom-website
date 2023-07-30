import { Type } from '@sinclair/typebox'
import { type Express } from 'express'
import payload from 'payload'
import { type InitOptions } from 'payload/config'
import { type Logger } from 'pino'

import { type Config } from '../config'

export const payloadEnvSchema = {
	PAYLOAD_SECRET: Type.String(),
	MONGODB_URI: Type.String(),
}

export const initPayloadCms = async (
	app: Express,
	config: Config,
	logger: Logger,
) => {
	const initOptions: InitOptions = {
		...config.payload,
		express: app,
		logger,
	}

	if (!initOptions.local) {
		initOptions.onInit = (payload) => {
			payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
		}
	}
	return payload.init(initOptions)
}
