import { type V2_ServerRuntimeMetaDescriptor } from '@remix-run/server-runtime'
import { formatOgTypeMeta, mergeTitle } from '~/app/utils/seo'
import { type Page } from '~/cms/payload-types'

import { type SiteInfo } from '../site/site.service.server'

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
	const ogImage = page.meta.ogImage ?? siteInfo?.meta.ogImage

	const pageMeta: V2_ServerRuntimeMetaDescriptor[] = []

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
