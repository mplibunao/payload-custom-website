import { Loader, type DataSource } from 'layered-loader'
import { type Payload } from 'payload'
import { type Logger } from 'pino'
import { IN_MEMORY_CONFIGURATION_BASE } from '~/constants/cacheConfig.server'

import { type SiteInfo, getSiteInfo } from './site.repository.server'

type Dependencies = {
	payload: Payload
	logger: Logger
}

const SiteInfoDataSource = (deps: Dependencies): DataSource<SiteInfo> => {
	return {
		name: 'Site Loader',
		get() {
			return getSiteInfo(deps)
		},
	}
}

export class SiteInfoLoader extends Loader<SiteInfo> {
	constructor(deps: Dependencies) {
		super({
			inMemoryCache: IN_MEMORY_CONFIGURATION_BASE,
			dataSources: [SiteInfoDataSource(deps)],
			logger: deps.logger,
		})
	}
}
