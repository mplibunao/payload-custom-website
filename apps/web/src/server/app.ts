import { type ServerBuild } from '@remix-run/node'
import express, { type Express } from 'express'
import pino from 'pino'
import pinoHttp from 'pino-http'

import { registerDependencies, type DependencyOverrides } from './container'
import { registerLogger } from './container/registerLogger.ts'
import { type Config } from './infra/config.server.ts'
import { getCloudRunLoggerConfig } from './infra/logger/cloudRunLoggerOpts.ts'
import { initPayloadCms } from './infra/payload/index.ts'
import {
	createDevRequestHandler,
	createRemixRequestHandler,
} from './infra/remix/index.ts'
import { remixEarlyHints } from './middleware/earlyHints.ts'
import { stripTrailingSlash } from './middleware/stripTrailingSlashes.ts'
import { healthCheck } from './routes/healthcheck.ts'

// eslint-disable-next-line max-statements
export const initApp = async (
	app: Express,
	{
		config,
		build,
		buildPath,
		dependencyOverrides = {},
	}: {
		config: Config
		build?: ServerBuild
		buildPath?: string
		dependencyOverrides?: DependencyOverrides
	},
) => {
	const logger = pino(getCloudRunLoggerConfig(config.loggerOpts))

	// separate logger DI from the rest of DI since it's required for overload protection and since we want overload to go first as much as possible
	registerLogger({ app, logger, config }, dependencyOverrides)
	app.use(
		pinoHttp({
			logger: app.locals.logger,
			autoLogging: config.env.NODE_ENV === 'production',
		}),
	)

	// always put this first so it always runs first (to take off further pressure)
	app.use(config.overloadProtection)

	// no ending slashes for SEO reasons
	app.use(stripTrailingSlash)

	await initPayloadCms(app, config, logger)

	registerDependencies({ app, config, logger })

	// trust all proxies in front of express
	// lets cookies / sessions work
	app.set('trust proxy', true)

	// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
	app.disable('x-powered-by')

	// Remix fingerprints its assets so we can cache forever.
	app.use(
		'/build',
		express.static('public/build', { immutable: true, maxAge: '1y' }),
	)

	// Aggressively cache fonts for a year
	app.use(
		'/fonts',
		express.static('public/fonts', { immutable: true, maxAge: '1y' }),
	)

	// Everything else (like favicon.ico) is cached for an hour. You may want to be
	// more aggressive with this caching.
	app.use(express.static('public', { maxAge: '1h' }))

	// Redirect all traffic at root to home page
	app.get('/', function (_, res) {
		res.redirect('/home')
	})

	app.get('/health', healthCheck(app.locals.logger, config))

	if (!config.payload.local) {
		if (!build || !buildPath) {
			throw new Error(
				'Remix build and build path are required when running on production or non-local api mode',
			)
		}
		app.all(
			'*',
			remixEarlyHints(build),
			// eslint-disable-next-line @typescript-eslint/no-misused-promises
			config.env.NODE_ENV === 'development'
				? await createDevRequestHandler({ build, config, buildPath, app })
				: createRemixRequestHandler({ build, config, app }),
		)
	}

	return app
}
