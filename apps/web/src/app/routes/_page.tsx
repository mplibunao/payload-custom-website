import { Link, Outlet } from '@remix-run/react'

import { Logo } from '../components/Icon/Logo'

export default function PageRoute(): JSX.Element {
	return (
		<>
			<header className='p-8 flex justify-between'>
				<Link to='/home' prefetch='intent'>
					<Logo />
				</Link>
				<div>menu</div>
			</header>

			<Outlet />

			<footer>Footer</footer>
		</>
	)
}
