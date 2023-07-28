import {
	type Logger,
	type AppDependencies,
	type DependencyOverrides,
} from '../container/index.ts'

declare global {
	namespace Express {
		interface Locals {
			logger: Logger
		}
	}
}

export const registerLogger = (
	dependencies: AppDependencies,
	dependencyOverrides: DependencyOverrides,
) => {
	dependencies.app.locals.logger =
		dependencyOverrides.logger ?? dependencies.logger
}
