import { type ServerBuild } from '@remix-run/node'
import compression from 'compression'
import express, { type Express, type Response } from 'express'
import helmet from 'helmet'

import { type Config } from './infra/config.ts'
import {
	createDevRequestHandler,
	createRemixRequestHandler,
} from './infra/remix/index.ts'
import { generateNonce } from './middleware/generateNonce.ts'

// eslint-disable-next-line max-statements
export const initApp = async (
	app: Express,
	{
		config,
		build,
		BUILD_PATH,
	}: { config: Config; build: ServerBuild; BUILD_PATH: string },
) => {
	// trust all proxies in front of express
	// lets cookies / sessions work
	app.set('trust proxy', true)

	const lazyMiddlewareQuery = []

	if (config.server.redirectHttpToHttps) {
		const middleware = import('./middleware/httpsOnly.ts')
		lazyMiddlewareQuery.push(middleware)
	}

	if (config.server.stripTraillingSlash) {
		const middleware = import('./middleware/stripTrailingSlashes.ts')
		lazyMiddlewareQuery.push(middleware)
	}

	// avoid waterfall by using Promise.all()
	const importedMiddlewares = await Promise.all(lazyMiddlewareQuery)
	for (let importedMiddleware of importedMiddlewares) {
		app.use(importedMiddleware.middleware)
	}

	app.use(compression())
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
	app.use(generateNonce)

	app.use(
		helmet({
			crossOriginEmbedderPolicy: false,
			contentSecurityPolicy: {
				// NOTE: Remove reportOnly when you're ready to enforce this CSP
				reportOnly: true,
				directives: {
					'connect-src': [
						config.env.NODE_ENV === 'development' ? 'ws:' : null,
						"'self'",
					].filter(Boolean),
					'font-src': ["'self'"],
					'frame-src': ["'self'"],
					'img-src': ["'self'", 'data:'],
					'script-src': [
						"'strict-dynamic'",
						"'self'",
						(_, res) => `'nonce-${(res as Response).locals.cspNonce}'`,
					],
					'script-src-attr': [
						(_, res) => `'nonce-${(res as Response).locals.cspNonce}'`,
					],
					'upgrade-insecure-requests': null,
				},
			},
		}),
	)

	app.all(
		'*',
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		config.env.NODE_ENV === 'development'
			? await createDevRequestHandler(build, config, BUILD_PATH)
			: createRemixRequestHandler(build, config),
	)

	return app
}
