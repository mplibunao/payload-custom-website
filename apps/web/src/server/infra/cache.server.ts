import {
	type ManualCache,
	type InMemoryCacheConfiguration,
	type RedisCacheConfiguration,
	type RedisNotificationConsumer,
	type RedisCache,
	type RedisNotificationPublisher,
} from 'layered-loader'
import { type Payload } from 'payload'
import { type Logger } from 'pino'

// Use long TTL because it's mostly static plus we use invalidation
const IN_MEMORY_CACHE_TTL_MS = 1000 * 60 * 60 * 24 // 24 hours
const IN_MEMORY_TTL_BEFORE_REFRESH = 1000 * 60 * 60 * 23 // 23 hours
const REDIS_CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7 // 1 week
const REDIS_CACHE_TTL_BEFORE_REFRESH = 1000 * 60 * 60 * 24 * 6 // 6 days

export const IN_MEMORY_CONFIGURATION_BASE: InMemoryCacheConfiguration = {
	ttlInMsecs: IN_MEMORY_CACHE_TTL_MS,
	ttlLeftBeforeRefreshInMsecs: IN_MEMORY_TTL_BEFORE_REFRESH,
	cacheType: 'fifo-object',
	cacheId: 'cache',
}

export const REDIS_CACHE_CONFIG: Partial<RedisCacheConfiguration> = {
	json: true,
	ttlInMsecs: REDIS_CACHE_TTL_MS,
	prefix: 'cache',
	ttlLeftBeforeRefreshInMsecs: REDIS_CACHE_TTL_BEFORE_REFRESH,
}

export class CacheService {
	constructor(private readonly cache: ManualCache<object>) {}

	/**
	 * Use this to cache a function return.
	 * @param func await cache.cacheThis(func () => payload.find({...}), ['key1', 'key2']);
	 * @param ...keys which is the array of cache keys
	 * @returns the result of the function or its cached value
	 */
	async exec<T extends object>(
		func: () => Promise<T>,
		keys: [string, ...string[]],
	) {
		if (keys.length === 0) throw new Error('Invalid cache key')
		const key = keys.join(',')
		const cached = await this.cache.get(key)
		if (cached) {
			return cached as T
		}
		const result = await func()
		await this.cache.set(key, result)
		return result
	}

	async invalidate(keys: [string, ...string[]]) {
		if (keys.length === 0) throw new Error('Invalid cache key')
		const key = keys.join(',')
		return this.cache.invalidateCacheFor(key)
	}

	async update<T extends object>(value: T, keys: [string, ...string[]]) {
		if (keys.length === 0) throw new Error('Invalid cache key')
		const key = keys.join(',')
		return this.cache.set(key, value)
	}
}

export type LoaderCacheDeps<T> = {
	payload: Payload
	logger: Logger
	notificationConsumer: RedisNotificationConsumer<T>
	notificationPublisher: RedisNotificationPublisher<T>
	inMemoryCacheConfig: InMemoryCacheConfiguration
	redisCache: RedisCache<T>
}
