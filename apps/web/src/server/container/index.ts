import { type Express } from 'express'
import type Redis from 'ioredis'
import {
	HitStatisticsRecord,
	type InMemoryCacheConfiguration,
	ManualCache,
	createNotificationPair,
	RedisCache,
} from 'layered-loader'
import { type Logger } from 'pino'
import { SiteInfoLoader } from '~/app/modules/globals/site.repository.server'
import { SiteService } from '~/app/modules/globals/site.service.server'
import { type Site } from '~/cms/payload-types'
import {
	CacheService,
	IN_MEMORY_CONFIGURATION_BASE,
	REDIS_CACHE_CONFIG,
} from '~/server/infra/cache.server'

import { type Config } from '../infra/config.server'
import { RedisClient } from '../infra/redis'

declare global {
	namespace Express {
		interface Locals {
			config: Config
			cacheService: CacheService
			siteService: SiteService
			redis: Redis
			cacheRecord?: HitStatisticsRecord
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

// eslint-disable-next-line max-statements
export const registerDependencies = (
	{ app, logger, config }: AppDependencies,
	_dependencyOverrides: DependencyOverrides = {},
) => {
	const { payload } = app.locals
	const redis = new RedisClient({ config, logger })
	// for distributed invalidation of cache
	const redisPublisher = new RedisClient({ config, logger })
	const redisConsumer = new RedisClient({ config, logger })
	const inMemoryCacheConfig: InMemoryCacheConfiguration = {
		...IN_MEMORY_CONFIGURATION_BASE,
	}
	// allows us to view cache stats in healthcheck in dev
	if (config.env.NODE_ENV === 'development') {
		const record = new HitStatisticsRecord()
		app.locals.cacheRecord = record
		inMemoryCacheConfig.cacheType = 'lru-object-statistics'
		inMemoryCacheConfig.globalStatisticsRecord = record
	}

	/*
	 * Manual cache similar to lru cache.
	 * No dataloader but simpler to use and less boilerplate
	 * Types are easier to use as well
	 */
	const { publisher: notificationPublisher, consumer: notificationConsumer } =
		createNotificationPair<object>({
			channel: 'cache-notifications',
			consumerRedis: redisConsumer,
			publisherRedis: redisPublisher,
		})
	const asyncCache = new RedisCache<object>(redis, REDIS_CACHE_CONFIG)
	const cache = new ManualCache<object>({
		inMemoryCache: inMemoryCacheConfig,
		logger,
		notificationConsumer,
		notificationPublisher,
		asyncCache,
	})

	/*
	 * Loader cache
	 * Offers deduplication when fetching from datasource (similar to dataloader or react-query)
	 * Boilerplate heavy, you need to create one loader per query
	 * Need to create separate publisher, consumer, and redis cache because types will not match if we use object type
	 * .get() return type is T | undefined | null even if underlying query's return type is T which can be a bit of PITA
	 */
	const {
		publisher: siteLoaderNotificationPublisher,
		consumer: siteLoaderNotificationConsumer,
	} = createNotificationPair<Site>({
		channel: 'cache-notifications',
		consumerRedis: redisConsumer,
		publisherRedis: redisPublisher,
	})
	const redisCache = new RedisCache<Site>(redis, REDIS_CACHE_CONFIG)
	const siteInfoLoader = new SiteInfoLoader({
		payload,
		logger,
		notificationConsumer: siteLoaderNotificationConsumer,
		notificationPublisher: siteLoaderNotificationPublisher,
		inMemoryCacheConfig,
		redisCache,
	})
	const siteService = new SiteService({ siteInfoLoader, payload, config })

	app.locals.config = config
	app.locals.cacheService = new CacheService(cache)
	app.locals.siteService = siteService
	app.locals.redis = redis
}
