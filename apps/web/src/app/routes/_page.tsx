import { Outlet, Link, useLocation } from '@remix-run/react'

import { GeneralErrorBoundary } from '../components/error-boundary'
import { usePage } from '../utils/usePage'

export default function PageRoute(): JSX.Element {
	const page = usePage()
	if (!page?.layout) throw new Error('Layout not found')
	return (
		<main>
			<header>
				<h1>{page?.title}</h1>
			</header>

			<Outlet />
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
						<Link to='/' className='text-body-md underline'>
							Back to home
						</Link>
					</div>
				),
			}}
		/>
	)
}
