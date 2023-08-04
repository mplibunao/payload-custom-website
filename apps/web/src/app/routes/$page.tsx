import { type DataFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData, useLocation } from '@remix-run/react'

import { RenderBlocks } from '../components/Blocks/RenderBlocks'
import { GeneralErrorBoundary } from '../components/error-boundary'
import { NotFound } from '../utils/http.server'

export const loader = async ({ context, params }: DataFunctionArgs) => {
	if (!params.page) throw NotFound('Page Not Found')
	const res = await context.payload.find({
		collection: 'pages',
		overrideAccess: false,
		where: { slug: { equals: params.page } },
	})

	if (res.docs.length === 0) throw NotFound('Page Not Found')

	return {
		page: res.docs[0],
	}
}

export default function DynamicPageRoute(): JSX.Element {
	const { page } = useLoaderData<typeof loader>()
	return page?.layout ? (
		<RenderBlocks layout={page.layout} />
	) : (
		<ErrorBoundary />
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
						<Link to='/' className='text-body-md underline'>
							Back to home
						</Link>
					</div>
				),
			}}
		/>
	)
}
