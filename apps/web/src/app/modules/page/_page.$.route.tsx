import {
	json,
	type DataFunctionArgs,
	type MetaFunction,
	type HeadersFunction,
} from '@remix-run/node'
import { Link, useLoaderData, useLocation } from '@remix-run/react'
import { RenderBlocks } from '~/app/components/Blocks/RenderBlocks'
import { PageHero } from '~/app/components/PageHero'
import { GeneralErrorBoundary } from '~/app/components/error-boundary'
import { NotFound } from '~/app/utils/http.server'
import { isRejected } from '~/app/utils/misc'
import { getCacheHeaders } from '~/server/infra/cache.server'
import { type NonEmptyArray } from '~/types/utils'

import { getPage, getPageMeta } from './page.service.server'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	if (!data) return []
	return data.meta
}

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
	'Cache-Control': loaderHeaders.get('Cache-Control') ?? '',
})

export const loader = async ({
	context,
	params,
	request,
}: DataFunctionArgs) => {
	return context.serverTiming.time('routes/_page.$#loader', async () => {
		const { logger } = context

		if (!params['*']?.trim()) throw NotFound('Page Not Found')
		const slugs = params['*'].split('/') as NonEmptyArray<string>

		const results = await Promise.allSettled([
			getPage(context, slugs[slugs.length - 1] as string),
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
					'Cache-Control': getCacheHeaders(page),
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
			<RenderBlocks layout={page.layout} heroType={page.heroType} />
		</main>
	)
}

export function ErrorBoundary() {
	const location = useLocation()
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				404: () => (
					<div className='flex flex-col gap-6'>
						<div className='flex flex-col gap-3'>
							<h1>We can't find this page:</h1>
							<pre className='whitespace-pre-wrap break-all text-body-lg'>
								{location.pathname}
							</pre>
						</div>
						<Link to='/home' className='text-body-md underline'>
							Back to home
						</Link>
					</div>
				),
			}}
		/>
	)
}
