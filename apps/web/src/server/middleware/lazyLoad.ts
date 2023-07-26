import { type Express } from 'express'

import { type Config } from '../infra/config.ts'

export const lazyLoadMiddlewares = async (app: Express, config: Config) => {
	const lazyMiddlewareQuery = []

	if (config.server.redirectHttpToHttps) {
		const middleware = import('./httpsOnly.ts')
		lazyMiddlewareQuery.push(middleware)
	}

	if (config.server.stripTraillingSlash) {
		const middleware = import('./stripTrailingSlashes.ts')
		lazyMiddlewareQuery.push(middleware)
	}

	// avoid waterfall by using Promise.all()
	const importedMiddlewares = await Promise.all(lazyMiddlewareQuery)
	for (let importedMiddleware of importedMiddlewares) {
		app.use(importedMiddleware.middleware)
	}
}
