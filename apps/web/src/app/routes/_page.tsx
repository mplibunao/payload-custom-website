import { Outlet } from '@remix-run/react'

export default function PageRoute(): JSX.Element {
	return (
		<>
			<header className='p-8 flex justify-between'>
				<div>logo</div>
				<div>menu</div>
			</header>

			<Outlet />

			<footer>Footer</footer>
		</>
	)
}
