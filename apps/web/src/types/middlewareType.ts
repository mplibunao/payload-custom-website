import { type NextFunction, type Request, type Response } from 'express'

export type ExpressMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => void

export type AsyncExpressMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => Promise<void>
