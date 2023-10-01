import { Type } from '@sinclair/typebox'
import v8 from 'node:v8'
import overload, { type HttpProtectionInstance } from 'overload-protection'

import { type Env } from '../infra/config.server'

export const overloadProtectionEnvSchema = {
	HEALTHCHECK_MAX_EVENT_LOOP_DELAY: Type.Optional(
		Type.Number({ default: 200 }),
	),
}

export interface OverloadProtectionOpts {
	overloadProtection: HttpProtectionInstance
}

export const getOverloadProtectionOpts = (env: Env) => {
	const v8HeapStats = v8.getHeapStatistics()

	return overload('express', {
		production: env.NODE_ENV === 'production', // if production is false, detailed error messages are exposed to the client
		clientRetrySecs: 1, // Retry-After header, in seconds (0 to disable) [default 1]
		sampleInterval: 5, // sample rate, milliseconds [default 5]
		maxEventLoopDelay: env.HEALTHCHECK_MAX_EVENT_LOOP_DELAY, // maximum detected delay between event loop ticks [default 42]
		maxHeapUsedBytes: v8HeapStats.heap_size_limit, // maximum heap used threshold (0 to disable) [default 0]
		maxRssBytes: v8HeapStats.total_available_size, // maximum rss size threshold (0 to disable) [default 0]
		errorPropagationMode: false, // dictate behavior: take over the response
		// or propagate an error to the framework [default false]
		logging: 'warn', // set to string for log level or function to pass data to
		logStatsOnReq: false, // set to true to log stats on every requests
	})
}
