import { type Payload } from 'payload'
import { optimizeOgImage } from '~/app/utils/seo'
import { type Site } from '~/cms/payload-types'
import { type Config } from '~/server/infra/config.server'

import { getSiteInfo, type SiteInfoLoader } from './site.repository.server'

type Deps = {
	payload: Payload
	siteInfoLoader: SiteInfoLoader
	config: Config
}

export type SiteInfo = {
	meta: Omit<Site['meta'], 'ogImage'> & {
		ogImage?: string
	}
}

export class SiteService {
	private readonly key = 'siteInfo'
	constructor(private readonly deps: Deps) {}

	async getSiteInfo() {
		const site =
			this.deps.siteInfoLoader.getInMemoryOnly(this.key) ||
			(await this.deps.siteInfoLoader.getAsyncOnly(this.key))
		if (!site) {
			return this.formatSiteInfo(await getSiteInfo(this.deps))
		}
		return this.formatSiteInfo(site)
	}

	private formatSiteInfo(site: Site): SiteInfo {
		const defaults = this.deps.config.site
		const ogImage =
			typeof site.meta.ogImage === 'string'
				? site.meta.ogImage
				: site.meta.ogImage.filename

		return {
			meta: {
				title: site.meta.title ?? defaults.title,
				description: site.meta.description ?? defaults.description,
				ogImage: optimizeOgImage(ogImage),
			},
		}
	}

	async invalidate() {
		return this.deps.siteInfoLoader.invalidateCacheFor(this.key)
	}
}
