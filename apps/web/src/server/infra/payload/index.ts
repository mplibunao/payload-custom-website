import { type Express } from 'express'
import payload from 'payload'

import { type Config } from '../config'

export const initPayloadCms = async (app: Express, config: Config) => {
	return payload.init({
		...config.payload,
		express: app,
	})
}
