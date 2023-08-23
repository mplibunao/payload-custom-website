import {
	json,
	type DataFunctionArgs,
	type V2_MetaFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { type V2_ServerRuntimeMetaDescriptor } from '@remix-run/server-runtime'

import { RenderBlocks } from '../components/Blocks/RenderBlocks'
import { Grid, Container } from '../components/Layout'
import { NotFound } from '../utils/http.server'
import { mergeTitle, formatOgTypeMeta } from '../utils/seo'
import { ErrorBoundary as NotFoundErrorBoundary } from './$'

// eslint-disable-next-line max-statements
export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
	if (!data) return formatOgTypeMeta(undefined, [])
	const title = mergeTitle(data.siteInfo?.meta.title, data.page?.meta?.title)
	const description =
		data.page?.meta?.description ?? data.siteInfo?.meta.description
	const ogImage = data.page?.meta?.ogImage ?? data.siteInfo?.meta.ogImage

	const pageMeta: V2_ServerRuntimeMetaDescriptor[] = [
		{ name: 'og:url', content: data.url },
	]

	if (title) {
		pageMeta.push({ title })
		pageMeta.push({
			name: 'twitter:title',
			content: title,
		})
		pageMeta.push({
			name: 'og:title',
			content: title,
		})
	}

	if (description) {
		pageMeta.push({
			name: 'description',
			content: description,
		})
		pageMeta.push({
			name: 'twitter:description',
			content: description,
		})
		pageMeta.push({
			name: 'og:description',
			content: description,
		})
	}

	if (ogImage) {
		pageMeta.push({
			name: 'twitter:image',
			content: ogImage,
		})
		pageMeta.push({
			name: 'og:image',
			content: ogImage,
		})
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
			<header>
				<h1>{page?.title}</h1>
			</header>
			<RenderBlocks layout={page.layout} />
			<Container>
				<Grid>
					<div className='col-span-6'>Here is some first-column content</div>
					<div className='col-span-6'>Here is some first-column content</div>
				</Grid>
			</Container>
		</main>
	)
}

export function ErrorBoundary() {
	return <NotFoundErrorBoundary />
}
