import { Type } from '@sinclair/typebox'
import { type Express } from 'express'

export const lazyMiddlewareEnvSchema = {
	STRIP_TRAILING_SLASH: Type.Boolean({ default: true }),
	REDIRECT_HTTP_TO_HTTPS: Type.Boolean({ default: false }),
}

export interface ExpressLazyMiddlewareConfig {
	stripTrailingSlash?: boolean
	redirectHttpToHttps?: boolean
}

export const lazyLoadMiddlewares = async (
	app: Express,
	config: { server: ExpressLazyMiddlewareConfig },
) => {
	const lazyMiddlewareQuery = []

	if (config.server.redirectHttpToHttps) {
		const middleware = import('./httpsOnly.ts')
		lazyMiddlewareQuery.push(middleware)
	}

	if (config.server.stripTrailingSlash) {
		const middleware = import('./stripTrailingSlashes.ts')
		lazyMiddlewareQuery.push(middleware)
	}

	// avoid waterfall by using Promise.all()
	const importedMiddlewares = await Promise.all(lazyMiddlewareQuery)
	for (let importedMiddleware of importedMiddlewares) {
		app.use(importedMiddleware.middleware)
	}
}
