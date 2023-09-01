import {
	json,
	type DataFunctionArgs,
	type V2_MetaFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { type V2_ServerRuntimeMetaDescriptor } from '@remix-run/server-runtime'

import { RenderBlocks } from '../components/Blocks/RenderBlocks'
import { PageHero } from '../components/PageHero'
import { NotFound } from '../utils/http.server'
import { mergeTitle, formatOgTypeMeta } from '../utils/seo'
import { ErrorBoundary as NotFoundErrorBoundary } from './$'

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
	if (!data) return formatOgTypeMeta(undefined, [])
	const title = mergeTitle(data.siteInfo?.meta.title, data.page?.meta?.title)
	const description =
		data.page?.meta?.description ?? data.siteInfo?.meta.description
	const ogImage = data.page?.meta?.ogImage ?? data.siteInfo?.meta.ogImage

	const pageMeta: V2_ServerRuntimeMetaDescriptor[] =
		Array<V2_ServerRuntimeMetaDescriptor>(10)
	pageMeta.push({ name: 'og:url', content: data.url })

	if (title) {
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
			],
		)
	}

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

	return formatOgTypeMeta(data?.page?.meta, pageMeta)
}

export const loader = async ({
	context,
	params,
	request,
}: DataFunctionArgs) => {
	if (!params.slug) throw NotFound('Page Not Found')

	const [page, siteInfoData] = await Promise.allSettled([
		context.payload.find({
			collection: 'pages',
			overrideAccess: false,
			where: { slug: { equals: params.slug } },
		}),

		context.siteService.getSiteInfo(),
	])

	if (page.status === 'rejected' || page.value.docs.length === 0) {
		throw NotFound('Page Not Found')
	}

	const siteInfo =
		siteInfoData.status === 'fulfilled' ? siteInfoData.value : undefined

	return json({
		page: page.value.docs[0],
		siteInfo,
		url: request.url,
	})
}

export default function DynamicPageRoute(): JSX.Element {
	const { page } = useLoaderData<typeof loader>()
	if (!page?.layout) throw new Error('Layout not found')

	return (
		<main>
			<PageHero
				title={page.title}
				heroContent={page.heroContent}
				heroMedia={page.heroMedia}
				heroType={page.heroType}
			/>
			<RenderBlocks layout={page.layout} />
		</main>
	)
}

export function ErrorBoundary() {
	return <NotFoundErrorBoundary />
}
