import { Type } from '@sinclair/typebox'
import { type Express } from 'express'
import { type InitOptions } from 'payload/config'

export const payloadEnvSchema = {
	PAYLOAD_SECRET: Type.String(),
	MONGODB_URI: Type.String(),
}

export type PayloadConfigOpts = {
	payload: {
		secret: string
		mongoURL: string
		local: boolean
	}
}

export const getPayloadOpts = (
	app: Express,
	config: PayloadConfigOpts,
): InitOptions => {
	const payloadConfig: InitOptions = {
		...config.payload,
		express: app,
	}

	if (!config.payload.local) {
		payloadConfig.onInit = (payload) => {
			payload.logger.info(`Started Payload Admin at ${payload.getAdminURL()}`)
		}
	}

	return payloadConfig
}
