import { type Payload } from 'payload'
import { type Site } from '~/cms/payload-types'

type Dependencies = {
	payload: Payload
}

export type SiteInfo = {
	logo?: Site['logo']
	meta: Omit<Site['meta'], 'ogImage'> & {
		ogImage?: string
	}
}

export const getSiteInfo = async ({
	payload,
}: Dependencies): Promise<SiteInfo> => {
	const site = await payload.findGlobal({ slug: 'site' })
	const ogImage =
		typeof site.meta.ogImage !== 'string'
			? site.meta.ogImage.sizes?.og?.url
			: undefined

	return {
		logo: site.logo,
		meta: {
			...site.meta,
			ogImage,
		},
	}
}
