import { type Request, type Response, type NextFunction } from 'express'

const getHost = (req: { get: (key: string) => string | undefined }) =>
	req.get('X-Forwarded-Host') ?? req.get('host') ?? ''

// Note: this is not needed for gcp cloud run
// https://cloud.google.com/run/docs/triggering/https-request#creating_public_services
export const middleware = (req: Request, res: Response, next: NextFunction) => {
	const proto = req.get('X-Forwarded-Proto')
	if (proto === 'http') {
		const host = getHost(req)
		res.set('X-Forwarded-Proto', 'https')
		res.redirect(`https://${host}${req.originalUrl}`)
		return
	}
	next()
}
