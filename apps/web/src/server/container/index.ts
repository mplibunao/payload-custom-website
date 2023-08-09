import { type Express } from 'express'
import { type Logger } from 'pino'
import { SiteInfoLoader } from '~/app/modules/site/site.datasource.server'

import { type Config } from '../infra/config.server'

declare global {
	namespace Express {
		interface Locals {
			siteInfoLoader: SiteInfoLoader
			config: Config
		}
	}
}

export interface AppDependencies {
	app: Express
	logger: Logger
	config: Config
}

export interface Dependencies {
	logger: Logger
}

export type DependencyOverrides = Partial<Dependencies>

export const registerDependencies = (
	{ app, logger, config }: AppDependencies,
	_dependencyOverrides: DependencyOverrides = {},
) => {
	const siteInfoLoader = new SiteInfoLoader({
		logger,
		payload: app.locals.payload,
	})
	app.locals.siteInfoLoader = siteInfoLoader
	app.locals.config = config
}
