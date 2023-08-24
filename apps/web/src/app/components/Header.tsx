import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as Toggle from '@radix-ui/react-toggle'
import { Link } from '@remix-run/react'
import { twMerge } from 'tailwind-merge'
import { type MegaMenu, type SocialMedia } from '~/cms/payload-types'

import { useDisclosure } from '../utils/useDisclosure'
import { Icon } from './Icon/Icon'
import { Logo } from './Icon/Logo'
import { Container, Grid } from './Layout'
import { SiteLink } from './SiteLink'

export interface HeaderProps {
	megaMenu?: MegaMenu
	socialMedia: NonNullable<SocialMedia['links']>
}

export const Header = ({ megaMenu, socialMedia }: HeaderProps): JSX.Element => {
	const { isOpen: modalIsOpen, onToggle, onChange, onClose } = useDisclosure()
	return (
		<header className='p-6 md:p-10 flex justify-between fixed top-0 left-0 right-0 pointer-events-none z-[60]'>
			<Link to='/home' prefetch='viewport' className='pointer-events-all'>
				<Logo />
			</Link>

			<DialogPrimitive.Root
				open={modalIsOpen}
				onOpenChange={onChange}
				modal={false}
			>
				<DialogPrimitive.Trigger asChild>
					<Toggle.Root
						aria-label='Toggle Menu'
						pressed={modalIsOpen}
						onPressedChange={onToggle}
						className={twMerge(
							'h-14 w-14 bg-gray flex items-center justify-center rounded-full focus:outline-none focus:bg-lightGray active:outline-none active:bg-highlightGray transition-all duration-300 ease-linear pointer-events-all border-4',
							modalIsOpen ? 'border-antique' : 'border-gray',
						)}
					>
						<MenuIcon modalIsOpen={modalIsOpen} />
					</Toggle.Root>
				</DialogPrimitive.Trigger>

				<MegaMenuDialog>
					<Container>
						<Grid className='z-0 md:z-auto pointer-events-none md:pointer-events-auto mb-72 md:mb-0 '>
							<nav className='col-span-8'>
								{megaMenu?.nav?.map(({ link }, i) => (
									<h3 key={i} className={i === 0 ? 'm-0' : undefined}>
										<SiteLink
											{...link}
											className='text-antique hover:transition-all hover:duration-300 hover:ease-linear hover:text-blue pointer-events-all'
											onClick={onClose}
											prefetch='viewport'
										>
											{link.label}
										</SiteLink>
									</h3>
								))}
							</nav>

							{socialMedia.length > 0 && (
								<div className='col-span-3'>
									{socialMedia.map(({ url, label, id }) => (
										<div className='large' key={id}>
											<a
												href={url}
												target='_blank'
												rel='noopener noreferrer'
												className='transition-all duration-300 ease-linear hover:text-blue text-white'
											>
												{label}
											</a>
										</div>
									))}
								</div>
							)}
						</Grid>
					</Container>

					<LetsTalk />
				</MegaMenuDialog>
			</DialogPrimitive.Root>
		</header>
	)
}

type MegaMenuDialogProps = {
	children?: React.ReactNode
}

const MegaMenuDialog = (props: MegaMenuDialogProps) => {
	return (
		<DialogPrimitive.Portal>
			<DialogPrimitive.Content
				className={twMerge(
					'duration-500 fixed left-0 top-0 bg-gray w-full h-full pt-header pb-0 px-9 md:px-0 overflow-y-auto border-0 overflow-x-hidden z-50 transition-opacity ease-linear data-[state=closed]:opacity-0 data-[state=open]:opacity-100 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
				)}
			>
				{props.children}
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
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
			strokeWidth='2'
			className='overflow-visible h-6 w-6 text-antique'
			viewBox='0 0 30 24'
			aria-hidden
			focusable={false}
		>
			<line
				x2='30'
				vectorEffect='non-scaling-stroke'
				className={twMerge(
					'transition-all duration-300 origin-center stroke-[color:var(--antique)] stroke-[2px]',
					modalIsOpen ? 'opacity-0 translate-x-0 translate-y-[-0.75rem]' : '',
				)}
			/>
			<line
				y1='12'
				x2='30'
				y2='12'
				vectorEffect='non-scaling-stroke'
				className={twMerge(
					'transition-all duration-300 origin-center stroke-[color:var(--antique)] stroke-[2px]',
					modalIsOpen ? 'opacity-100 rotate-45' : '',
				)}
			/>
			<line
				y1='12'
				x2='30'
				y2='12'
				vectorEffect='non-scaling-stroke'
				className={twMerge(
					'transition-all duration-300 origin-center stroke-[color:var(--antique)] stroke-[2px]',
					modalIsOpen ? 'opacity-100 -rotate-45' : 'opacity-0',
				)}
			/>
			<line
				y1='24'
				x2='30'
				y2='24'
				vectorEffect='non-scaling-stroke'
				className={twMerge(
					'transition-all duration-300 origin-center stroke-[color:var(--antique)] stroke-[2px]',
					modalIsOpen ? 'opacity-0 translate-x-0 translate-y-3' : '',
				)}
			/>
		</svg>
	)
}

const LetsTalk = () => {
	const { isOpen: isHovered, onOpen, onClose } = useDisclosure()
	return (
		<div className='fixed right-[-3rem] bottom-[-3rem] mb-[-4.5rem] sm:right-[-4.5rem] sm:bottom-[-9rem] sm:block md:right-[-7rem] md:bottom-[-12rem]'>
			<div className='w-[34rem] h-[34rem] md:w-[46rem] md:h-[46rem] xl:w-[54rem] xl:h-[54rem] relative'>
				<Icon
					id='letstalk'
					className={twMerge(
						'rotating-text',
						isHovered ? 'opacity-100' : 'opacity-20',
					)}
					hidden
				/>
				<Link
					to='/contact'
					prefetch='viewport'
					className='w-full h-full flex flex-col justify-center items-center relative text-antique'
					onMouseEnter={onOpen}
					onMouseLeave={onClose}
				>
					<Icon
						id='arrow'
						hidden
						className={twMerge(
							'transition-all ease-linear duration-300',
							isHovered
								? 'opacity-100 arrow-animate'
								: 'rotate-[-45deg] opacity-20',
						)}
					/>
					<h3 className='mb-16'>Let's talk</h3>
				</Link>
			</div>
		</div>
	)
}
