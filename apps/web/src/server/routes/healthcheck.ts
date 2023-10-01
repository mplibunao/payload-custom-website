import type Redis from 'ioredis'
import { ConnectionStates } from 'mongoose'
import v8 from 'node:v8'
import { type Logger } from 'pino'
import { type ExpressMiddleware } from '~/types/middlewareType'

import { type Config } from '../infra/config.server'

export const healthCheck =
	(logger: Logger, config: Config): ExpressMiddleware =>
	async (req, res) => {
		const v8HeapStatistics = v8.getHeapStatistics()
		const processMemoryUsagePct =
			(v8HeapStatistics.total_heap_size / v8HeapStatistics.heap_size_limit) *
			100
		const mem = process.memoryUsage()

		if (processMemoryUsagePct > 80) {
			logger.warn({
				processMemoryUsagePct,
				totalHeapSize: v8HeapStatistics.total_heap_size,
				heapSizeLimit: v8HeapStatistics.heap_size_limit,
			})
		}

		res.send({
			cache:
				req.app.locals.cacheRecord?.records ?? 'Only available in development',
			timestamp: new Date().toISOString(),
			status: 'ok',
			redis: await redisCheck(req.app.locals.redis, req.app.locals.logger),
			db: mapMongooseStateToLabel(
				req.app.locals.payload.globals.Model.base.connection.readyState,
			),
			metrics: {
				eventLoopDelay: config.overloadProtection.eventLoopDelay,
				rssBytes: mem.rss,
				heapUsed: mem.heapUsed,
				uptime: process.uptime(),
				processMemoryUsagePct,
			},
		})
	}

async function redisCheck(redis: Redis, logger: Logger) {
	try {
		const response = await redis.ping()
		return response === 'PONG' ? 'ok' : 'fail'
	} catch (err) {
		if (process.env.APP_ENV !== 'test') {
			logger.warn({ err }, 'failed to read redis during health check')
		}
		return 'fail'
	}
}

function mapMongooseStateToLabel(readyState: ConnectionStates): string {
	switch (readyState) {
		case ConnectionStates.disconnected:
			return 'Disconnected'
		case ConnectionStates.connected:
			return 'Connected'
		case ConnectionStates.connecting:
			return 'Connecting'
		case ConnectionStates.disconnecting:
			return 'Disconnecting'
		case ConnectionStates.uninitialized:
			return 'Uninitialized'
		default:
			return 'Unknown'
	}
}
