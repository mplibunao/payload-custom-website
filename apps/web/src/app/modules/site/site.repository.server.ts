import { Loader, type DataSource } from 'layered-loader'
import { type Site } from '~/cms/payload-types'
import { type LoaderCacheDeps } from '~/server/infra/cache.server'

type Dependencies = LoaderCacheDeps<Site>

export const getSiteInfo = (deps: Pick<Dependencies, 'payload'>) => {
	return deps.payload.findGlobal({ slug: 'site' })
}

const SiteInfoDataSource = (deps: Dependencies): DataSource<Site> => {
	return {
		name: 'Site Loader',
		get() {
			return getSiteInfo(deps)
		},
	}
}

export class SiteInfoLoader extends Loader<Site> {
	constructor(deps: Dependencies) {
		super({
			inMemoryCache: deps.inMemoryCacheConfig,
			dataSources: [SiteInfoDataSource(deps)],
			logger: deps.logger,
			notificationConsumer: deps.notificationConsumer,
			notificationPublisher: deps.notificationPublisher,
			asyncCache: deps.redisCache,
		})
	}
}
