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
import { CACHE_SHORT, CACHE_LONG, CACHE_STANDARD } from '~/constants'

// Use long TTL because it's mostly static plus we use invalidation
const IN_MEMORY_CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7 // 7 days
const IN_MEMORY_TTL_BEFORE_REFRESH = 1000 * 60 * 60 * 24 * 6 // 6 days
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

export type CacheUpdateKey = [string, ...string[]]

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
		const cached =
			this.cache.getInMemoryOnly(key) || (await this.cache.getAsyncOnly(key))
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

	async update<T extends object>(value: T, keys: CacheUpdateKey) {
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

export const getCacheHeaders = (props: {
	contentType: 'dynamic' | 'static'
	updatedAt: string
}): string => {
	if (props.contentType === 'dynamic') return CACHE_SHORT
	// if was recently updated, give user chance to make edits but after first day, we'll cache this more aggressively until the next edit
	const msSinceUpdated = Date.now() - Date.parse(props.updatedAt)
	return msSinceUpdated < 8_640_000_000 ? CACHE_STANDARD : CACHE_LONG
}
