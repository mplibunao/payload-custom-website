import { type Express } from 'express'
import { type Payload } from 'payload'

import { type Config } from '../infra/config.ts'

// temp while payload uses an outdated version of pino
export type Logger = Payload['logger']

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
