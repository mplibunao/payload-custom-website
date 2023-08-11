import { json, type DataFunctionArgs } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'

import { Logo } from '../components/Logo'

export const loader = async ({ context }: DataFunctionArgs) => {
	return json({
		logo: context.siteInfo.logo,
	})
}

export default function PageRoute(): JSX.Element {
	const { logo } = useLoaderData<typeof loader>()
	return (
		<>
			<header className='p-8 flex justify-between'>
				<Link to='/home' prefetch='intent'>
					<Logo logo={logo} className='text-green-500 fill-green-500' />
				</Link>
				<div>menu</div>
			</header>

			<Outlet />

			<footer>Footer</footer>
		</>
	)
}
