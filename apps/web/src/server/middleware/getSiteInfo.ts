import { type SiteInfo } from '~/app/modules/site/site.repository.server'
import { type AsyncExpressMiddleware } from '~/types/middlewareType'

declare global {
	namespace Express {
		interface Request {
			siteInfo: SiteInfo
		}
	}
}

export const getSiteInfo: AsyncExpressMiddleware = async (req, _, next) => {
	const { app } = req
	const siteInfo = await app.locals.siteInfoLoader.get('')
	req.siteInfo = {
		...siteInfo,
		title: siteInfo?.title ?? app.locals.config.site.title,
		description: siteInfo?.description ?? app.locals.config.site.description,
		twitter: siteInfo?.twitter,
	}

	next()
}
