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

export const CACHE_STANDARD =
	'public, max-age=120, s-max-age=120, stale-while-revalidate=86400, stale-if-error=86400'
// Use more than 10 hours so we can take advantage of cloudflare's reserve cache and keep the edge cache filled
// 24 hours
export const CACHE_LONG =
	'public, max-age=86400, s-max-age=86400, stale-while-revalidate=86400, stale-if-error=86400'
export const CACHE_SHORT =
	'public, max-age=1, s-max-age=1, stale-while-revalidate=86400, stale-if-error=86400'
export const CACHE_SHORT_PRIVATE =
	'private, max-age=1, stale-while-revalidate=86400, stale-while-error=86400'
export const CACHE_STANDARD_PRIVATE =
	'private, max-age=120, stale-while-revalidate=86400, stale-if-error=86400'

// support longer cache for articles
// 1 week
export const CACHE_ARTICLE_SHORT =
	'public, max-age=604800, s-max-age=604800, stale-while-revalidate=86400, stale-if-error=86400'
// 2 weeks
export const CACHE_ARTICLE =
	'public, max-age=1209600, s-max-age=1209600, stale-while-revalidate=86400, stale-if-error=86400'
// 1 month
export const CACHE_ARTICLE_LONG =
	'public, max-age=2419200, s-max-age=2419200, stale-while-revalidate=86400, stale-if-error=86400'

// Use long TTL because it's mostly static plus we use invalidation
// 1000 * 60 * 60 * 24 * 7 = 7 days
const IN_MEMORY_CACHE_TTL_MS = 604800000 // 7 days
const IN_MEMORY_TTL_BEFORE_REFRESH = 518400000 // 6 days
const REDIS_CACHE_TTL_MS = 604800000 // 1 week
const REDIS_CACHE_TTL_BEFORE_REFRESH = 518400000 // 6 days

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
