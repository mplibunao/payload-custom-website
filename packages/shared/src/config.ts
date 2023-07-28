import { type TObject } from '@sinclair/typebox'
import envSchema from 'env-schema'

/*
 *DOTENV + TYPEBOX ENV SCHEMAS = ENV
 */
export const getDotEnv = () => {
	if (Boolean(process.env.CI) || process.env.APP_ENV === 'production') {
		return false
	}

	if (process.env.APP_ENV === 'test') {
		return {
			path: '.env.test',
		}
	}

	return true
}

export const getEnv = <T>(schema: TObject) => {
	return envSchema<T>({
		dotenv: getDotEnv(),
		schema,
		data: process.env,
	})
}
