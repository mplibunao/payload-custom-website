import {
	json,
	type DataFunctionArgs,
	type V2_MetaFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { RenderBlocks } from '../components/Blocks/RenderBlocks'
import { Grid, GridContainer } from '../components/Layout/Grid'
import { NotFound } from '../utils/http.server'
import { getMetaTitle, mergeTitle, formatOgTypeMeta } from '../utils/seo'

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
	const pageMeta = [
		{
			title: mergeTitle(data?.siteInfo?.title, data?.page?.meta?.title),
		},
		{
			name: 'description',
			content: data?.page?.meta?.description ?? data?.siteInfo?.description,
		},
		{
			name: 'twitter:title',
			content: getMetaTitle(data?.siteInfo?.title, data?.page?.meta?.title),
		},
		{
			name: 'twitter:description',
			content: data?.page?.meta?.description ?? data?.siteInfo?.description,
		},
		{
			name: 'twitter:image',
			content: data?.page?.meta?.ogImage ?? data?.siteInfo.ogImage,
		},
		{
			name: 'og:title',
			content: mergeTitle(data?.siteInfo.title, data?.page?.meta?.title),
		},
		{ name: 'og:url', content: data?.url },
		{
			name: 'og:description',
			content: data?.page?.meta?.description ?? data?.siteInfo?.description,
		},
		{
			name: 'og:image',
			content: data?.page?.meta?.ogImage ?? data?.siteInfo.ogImage,
		},
	]

	return formatOgTypeMeta(data?.page?.meta, pageMeta)
}

export const loader = async ({
	context,
	params,
	request,
}: DataFunctionArgs) => {
	if (!params.slug) throw NotFound('Page Not Found')

	const res = await context.payload.find({
		collection: 'pages',
		overrideAccess: false,
		where: { slug: { equals: params.slug } },
	})

	if (res.docs.length === 0) throw NotFound('Page Not Found')

	return json({
		page: res.docs[0],
		siteInfo: context.siteInfo,
		url: request.url,
	})
}

export default function DynamicPageRoute(): JSX.Element {
	const { page } = useLoaderData<typeof loader>()
	if (!page?.layout) throw new Error('Layout not found')

	return (
		<>
			<RenderBlocks layout={page.layout} />
			<GridContainer>
				<Grid>
					<div className='col-span-6'>Here is some first-column content</div>
					<div className='col-span-6'>Here is some first-column content</div>
				</Grid>
			</GridContainer>
		</>
	)
}