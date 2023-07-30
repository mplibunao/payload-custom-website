import { Type } from '@sinclair/typebox'
import { type Express } from 'express'
import payload from 'payload'
import { type InitOptions } from 'payload/config'

import { type Config } from '../config'

export const payloadEnvSchema = {
	PAYLOAD_SECRET: Type.String(),
	MONGODB_URI: Type.String(),
}

export const initPayloadCms = async (app: Express, config: Config) => {
	const initOptions: InitOptions = {
		...config.payload,
		express: app,
	}

	if (!initOptions.local) {
		initOptions.onInit = (payload) => {
			payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
		}
	}
	return payload.init(initOptions)
}
