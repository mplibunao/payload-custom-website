import {
	json,
	type DataFunctionArgs,
	type V2_MetaFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { RenderBlocks } from '~/app/components/Blocks/RenderBlocks'
import { PageHero } from '~/app/components/PageHero'
import { ErrorBoundary as NotFoundErrorBoundary } from '~/app/routes/$'
import { NotFound } from '~/app/utils/http.server'

import { getPage, getPageMeta } from './page.service.server'

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
	if (!data) return []
	return data.meta
}

export const loader = async ({
	context,
	params,
	request,
}: DataFunctionArgs) => {
	return context.serverTiming.time('routes/_page.$slug#loader', async () => {
		if (!params.slug) throw NotFound('Page Not Found')

		const [pageData, siteInfoData] = await Promise.allSettled([
			getPage(context, params.slug),
			context.siteService.getSiteInfo(),
		])

		if (pageData.status === 'rejected' || !pageData.value.docs[0]) {
			throw NotFound('Page Not Found')
		}
		const page = pageData.value.docs[0]

		const siteInfo =
			siteInfoData.status === 'fulfilled' ? siteInfoData.value : undefined

		return json(
			{
				page,
				siteInfo,
				meta: getPageMeta({ page, siteInfo, url: request.url }),
			},
			{
				headers: {
					'Cache-Control':
						'public, max-age=60, s-max-age=60, stale-while-revalidate',
				},
			},
		)
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
