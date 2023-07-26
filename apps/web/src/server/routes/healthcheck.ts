import v8 from 'node:v8'
import { type AppMiddleware } from '~/types/middlewareType'

import { config } from '../infra/config'

export const healthCheck: AppMiddleware = (req, res) => {
	const v8HeapStatistics = v8.getHeapStatistics()
	const processMemoryUsagePct =
		(v8HeapStatistics.total_heap_size / v8HeapStatistics.heap_size_limit) * 100
	const mem = process.memoryUsage()

	if (processMemoryUsagePct > 80) {
		req.app.locals.logger.warn({
			processMemoryUsagePct,
			totalHeapSize: v8HeapStatistics.total_heap_size,
			heapSizeLimit: v8HeapStatistics.heap_size_limit,
		})
	}

	res.send({
		timestamp: new Date().toISOString(),
		status: 'ok',
		metrics: {
			eventLoopDelay: config.overloadProtection.eventLoopDelay,
			rssBytes: mem.rss,
			heapUsed: mem.heapUsed,
			uptime: process.uptime(),
			processMemoryUsagePct,
		},
	})
}
