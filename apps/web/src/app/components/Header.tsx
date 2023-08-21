import * as Toggle from '@radix-ui/react-toggle'
import { Link } from '@remix-run/react'
import { twMerge } from 'tailwind-merge'

import { useDisclosure } from '../utils/useDisclosure'
import { Logo } from './Icon/Logo'

export interface HeaderProps {}

export const Header = (_props: HeaderProps): JSX.Element => {
	const { isOpen: modalIsOpen, onToggle } = useDisclosure()
	return (
		<header className='p-8 flex justify-between'>
			<Link to='/home' prefetch='intent'>
				<Logo />
			</Link>

			<Toggle.Root
				aria-label='Toggle Menu'
				pressed={modalIsOpen}
				onPressedChange={onToggle}
				className={twMerge(
					'h-16 w-16 bg-gray flex items-center justify-center rounded-full border-0 focus:outline-none focus:bg-lightGray active:outline-none active:bg-highlightGray transition-all duration-200 ease-linear',
					modalIsOpen
						? 'shadow-[inset_0_0_0_3px_var(--antique)]'
						: 'shadow-[inset_0_0_0_3px_var(--gray)]',
				)}
			>
				<MenuIcon modalIsOpen={modalIsOpen} />
			</Toggle.Root>
		</header>
	)
}

type MenuIconProps = {
	modalIsOpen: boolean
}

const MenuIcon = ({ modalIsOpen }: MenuIconProps) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			stroke='currentColor'
			stroke-width='2'
			className='overflow-visible h-6 w-6 text-antique'
			viewBox='0 0 30 24'
			aria-hidden
			focusable={false}
		>
			<line
				x2='30'
				vector-effect='non-scaling-stroke'
				className={twMerge(
					'transition-all duration-[400ms] origin-center stroke-[color:var(--antique)] stroke-[2px]',
					modalIsOpen ? 'opacity-0 translate-x-0 translate-y-[-0.75rem]' : '',
				)}
			/>
			<line
				y1='12'
				x2='30'
				y2='12'
				vector-effect='non-scaling-stroke'
				className={twMerge(
					'transition-all duration-[400ms] origin-center stroke-[color:var(--antique)] stroke-[2px]',
					modalIsOpen ? 'opacity-100 rotate-45' : '',
				)}
			/>
			<line
				y1='12'
				x2='30'
				y2='12'
				vector-effect='non-scaling-stroke'
				className={twMerge(
					'transition-all duration-[400ms] origin-center stroke-[color:var(--antique)] stroke-[2px]',
					modalIsOpen ? 'opacity-100 -rotate-45' : 'opacity-0',
				)}
			/>
			<line
				y1='24'
				x2='30'
				y2='24'
				vector-effect='non-scaling-stroke'
				className={twMerge(
					'transition-all duration-[400ms] origin-center stroke-[color:var(--antique)] stroke-[2px]',
					modalIsOpen ? 'opacity-0 translate-x-0 translate-y-3' : '',
				)}
			/>
		</svg>
	)
}
