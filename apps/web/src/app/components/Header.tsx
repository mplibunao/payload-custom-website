import { Link } from '@remix-run/react'

import { Icon } from './Icon/Icon'
import { Logo } from './Icon/Logo'
import { Button } from './ui/button'

export interface HeaderProps {}

export const Header = (_props: HeaderProps): JSX.Element => {
	return (
		<header className='p-8 flex justify-between'>
			<Link to='/home' prefetch='intent'>
				<Logo />
			</Link>
			<Button variant='outline' size='icon'>
				<Icon id='menu' className='h-4 w-4' />
			</Button>
		</header>
	)
}
