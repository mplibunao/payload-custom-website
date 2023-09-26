import { type ServerRuntimeMetaDescriptor } from '@remix-run/server-runtime'
import { formatOgTypeMeta, mergeTitle, optimizeOgImage } from '~/app/utils/seo'
import { type Page } from '~/cms/payload-types'
import { type CacheUpdateKey } from '~/server/infra/cache.server'

import { type SiteInfo } from '../globals/site.service.server'

export const getPageCacheKey = (slug: string): CacheUpdateKey => ['page', slug]

export const getPage = (ctx: Express.Locals, slug: string) => {
	return ctx.cacheService.exec(() => {
		return ctx.payload.find({
			collection: 'pages',
			overrideAccess: false,
			where: { slug: { equals: slug } },
		})
	}, getPageCacheKey(slug))
}

export const invalidatePage = async (ctx: Express.Locals, slug: string) => {
	await ctx.cacheService.invalidate(getPageCacheKey(slug))
}

export const getPageMeta = ({
	page,
	siteInfo,
	url,
}: {
	page: Page
	siteInfo?: SiteInfo
	url: string
}) => {
	const title = mergeTitle(page.meta.title, siteInfo?.meta.title)
	const description = page.meta.description ?? siteInfo?.meta.description
	let ogImage

	if (page.meta.ogImage) {
		if (typeof page.meta.ogImage === 'string') {
			ogImage = optimizeOgImage(page.meta.ogImage)
		} else {
			ogImage = optimizeOgImage(page.meta.ogImage.filename)
		}
	} else {
		ogImage = siteInfo?.meta.ogImage
	}

	const pageMeta: ServerRuntimeMetaDescriptor[] = []

	pageMeta.push(
		...[
			{ title },
			{
				name: 'twitter:title',
				content: title,
			},
			{
				name: 'og:title',
				content: title,
			},
			{ name: 'og:url', content: url },
		],
	)

	if (description) {
		pageMeta.push(
			...[
				{
					name: 'description',
					content: description,
				},
				{
					name: 'twitter:description',
					content: description,
				},
				{
					name: 'og:description',
					content: description,
				},
			],
		)
	}

	if (ogImage) {
		pageMeta.push(
			...[
				{
					name: 'twitter:image',
					content: ogImage,
				},
				{
					name: 'og:image',
					content: ogImage,
				},
			],
		)
	}

	return formatOgTypeMeta(page.meta, pageMeta)
}
