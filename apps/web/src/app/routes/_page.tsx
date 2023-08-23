import { Outlet } from '@remix-run/react'

export default function PageRoute(): JSX.Element {
	return (
		<>
			<Outlet />

			<footer>Footer</footer>
		</>
	)
}
