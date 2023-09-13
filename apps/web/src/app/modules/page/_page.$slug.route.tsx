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
import { isRejected } from '~/app/utils/misc'
import { CACHE_DEFAULT } from '~/constants'

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
		const { logger } = context
		if (!params.slug) throw NotFound('Page Not Found')

		const results = await Promise.allSettled([
			getPage(context, params.slug),
			context.siteService.getSiteInfo(),
		])

		for (let result of results) {
			if (isRejected(result)) {
				logger.error({
					err: result.reason as unknown,
					slug: params.slug,
					route: 'routes/_page.$slug#loader',
				})
			}
		}

		const [pageData, siteInfoData] = results

		if (pageData.status === 'rejected') throw pageData.reason
		const page = pageData.value.docs[0]
		if (!page) throw NotFound('Page Not Found')

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
					'Cache-Control': CACHE_DEFAULT,
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
