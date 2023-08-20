import { Outlet } from '@remix-run/react'

import { Header } from '../components/Header'

export default function PageRoute(): JSX.Element {
	return (
		<>
			<Header />

			<Outlet />

			<footer>Footer</footer>
		</>
	)
}
