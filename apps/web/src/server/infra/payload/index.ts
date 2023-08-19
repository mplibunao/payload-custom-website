import { type Express } from 'express'
import payload, { type Payload } from 'payload'
import { type InitOptions } from 'payload/config'
import { type Logger } from 'pino'
import { z } from 'zod'

import { type Config } from '../config.server.ts'

declare global {
	namespace Express {
		interface Locals {
			payload: Payload
		}
	}
}

export type PayloadConfig = {
	payload: InitOptions
}

export const payloadEnvSchema = {
	PAYLOAD_SECRET: z.string(),
	MONGODB_URI: z.string(),
	//'Sends heartbeat to check status of conn. Emits disconnected event after heartbeat fails. Defaults to 30s',
	MONGODB_HEARTBEAT_FREQUENCY_MS: z.coerce.number().optional().default(10_000),
	// 'Idle timeout for the connection to be dropped. Defaults to 0 (never)'
	MONGODB_SOCKET_TIMEOUT_MS: z.coerce.number().optional().default(300_000),
	PAYLOAD_PUBLIC_ENABLE_AUTOLOGIN: z.coerce.boolean().default(false),
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
