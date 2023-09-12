import { Type } from '@sinclair/typebox'
import { type Express } from 'express'
import payload, { type Payload } from 'payload'
import { type InitOptions } from 'payload/config'
import { type Logger } from 'pino'

import { type Config } from '../config.server.ts'

declare global {
	namespace Express {
		interface Locals {
			payload: Payload
		}
	}
}

export interface PayloadConfig {
	payload: InitOptions
}

export const payloadEnvSchema = {
	PAYLOAD_SECRET: Type.String(),
	MONGODB_URI: Type.String(),
	MONGODB_HEARTBEAT_FREQUENCY_MS: Type.Number({
		default: 10_000,
		description:
			'Sends heartbeat to check status of conn. Emits disconnected event after heartbeat fails. Defaults to 30s',
	}),
	MONGODB_SOCKET_TIMEOUT_MS: Type.Number({
		default: 300_000,
		description:
			'Idle timeout for the connection to be dropped. Defaults to 0 (never)',
	}),
	PAYLOAD_PUBLIC_ENABLE_AUTOLOGIN: Type.Boolean({ default: false }),
	PAYLOAD_LOCAL_API: Type.Optional(Type.Boolean()),
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
	const payloadInstance = await payload.init(initOptions)
	app.locals.payload = payloadInstance
	return payloadInstance
}
