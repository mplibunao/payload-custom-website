import { type Express } from 'express'
import { type Logger } from 'pino'

import { type Config } from '../infra/config'

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
	_dependencies: AppDependencies,
	_dependencyOverrides: DependencyOverrides,
) => {}
