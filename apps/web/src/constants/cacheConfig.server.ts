import { type InMemoryCacheConfiguration } from 'layered-loader'

const IN_MEMORY_CACHE_TTL = 1000 * 60 * 5
const IN_MEMORY_TTL_BEFORE_REFRESH = 1000 * 60 * 4

export const IN_MEMORY_CONFIGURATION_BASE: InMemoryCacheConfiguration = {
	ttlInMsecs: IN_MEMORY_CACHE_TTL,
	ttlLeftBeforeRefreshInMsecs: IN_MEMORY_TTL_BEFORE_REFRESH,
	cacheType: 'fifo-object',
}
