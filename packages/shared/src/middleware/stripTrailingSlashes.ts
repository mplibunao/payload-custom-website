// no ending slashes for SEO reasons

import { type ExpressMiddleware } from 'src/types/typeUtils.ts'

// https://github.com/epicweb-dev/epic-stack/discussions/108
export const middleware: ExpressMiddleware = (req, res, next) => {
	if (req.path.endsWith('/') && req.path.length > 1) {
		const query = req.url.slice(req.path.length)
		const safepath = req.path.slice(0, -1).replace(/\/+/g, '/')
		res.redirect(301, safepath + query)
	} else {
		next()
	}
}
