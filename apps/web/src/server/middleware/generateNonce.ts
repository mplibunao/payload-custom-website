import crypto from 'crypto'
import { type AppMiddleware } from '~/types/middlewareType.ts'

declare global {
	namespace Express {
		interface Locals {
			cspNonce: string
		}
	}
}

export const generateNonce: AppMiddleware = (_, res, next) => {
	res.locals.cspNonce = crypto.randomBytes(16).toString('hex')
	next()
}
