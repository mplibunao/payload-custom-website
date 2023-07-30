import { healthCheck } from '@org/shared/lib/middleware/healthcheck'
import { type Express } from 'express'
import payload from 'payload'

import { type DependencyOverrides } from './container'
import { registerLogger } from './container/registerLogger'
import { type Config } from './infra/config'
import { getPayloadOpts } from './infra/payload/init'

export const initApp = async (
	app: Express,
	{
		config,
		dependencyOverrides = {},
	}: { config: Config; dependencyOverrides?: DependencyOverrides },
) => {
	// Redirect all traffic at root to admin UI
	app.get('/', function (_, res) {
		res.redirect('/admin')
	})

	await payload.init(getPayloadOpts(app, config))

	// separate logger DI from the rest of DI since it's required for overload protection and since we want overload to go first as much as possible
	registerLogger({ app, logger: payload.logger, config }, dependencyOverrides)

	// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
	app.disable('x-powered-by')

	app.get('/health', healthCheck(app.locals.logger, config))

	return app
}
