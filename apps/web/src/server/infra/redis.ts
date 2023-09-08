import { type Static, Type } from '@sinclair/typebox'
import Redis from 'ioredis'
import { type Logger } from 'pino'

export const redisEnvSchema = {
	REDIS_URL: Type.String(),
	REDIS_ENABLE_AUTO_PIPELINING: Type.Optional(
		Type.Boolean({
			default: true,
			description: 'https://www.youtube.com/watch?app=desktop&v=0L0ER4pZbX4',
		}),
	),
	REDIS_MAX_RETRIES_PER_REQ: Type.Optional(
		Type.Number({
			default: 20,
			description:
				"Lower is better for perf, since we don't wait when there are errors. If failing fast is ok",
		}),
	),
	REDIS_CONNECT_TIMEOUT: Type.Optional(Type.Number({ default: 10_000 })),
}

const redisSchema = Type.Object(redisEnvSchema)

export type RedisOpts = Static<typeof redisSchema>

export type RedisConfig = {
	redis: RedisOpts
	app: {
		APP_ENV: 'development' | 'production' | 'test'
	}
}

interface RedisClientDependencies {
	config: RedisConfig
	logger: Logger
}

export class RedisClient extends Redis {
	constructor({ config, logger }: RedisClientDependencies) {
		try {
			super(config.redis.REDIS_URL, {
				maxRetriesPerRequest: config.redis.REDIS_MAX_RETRIES_PER_REQ,
				connectTimeout: config.redis.REDIS_CONNECT_TIMEOUT,
				enableAutoPipelining: config.redis.REDIS_ENABLE_AUTO_PIPELINING,
				family: 4,
			})
		} catch (error) {
			const err = `Creating redis client failed`
			if (config.app.APP_ENV !== 'test') {
				logger.error({ error }, err)
			}
			throw new Error(err, { cause: error })
		}
	}
}

export async function closeRedisConnection(redis: Redis, logger: Logger) {
	return new Promise((resolve, reject) => {
		void redis.quit((err, result) => {
			if (err) {
				logger.error({ err }, 'Error closing redis connection')
				return reject(err)
			}
			return resolve(result)
		})
	})
}
