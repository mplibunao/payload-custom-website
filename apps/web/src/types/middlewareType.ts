import { type NextFunction, type Request, type Response } from 'express'

export type AppMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => void
