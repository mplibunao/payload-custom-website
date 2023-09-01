import { Link } from '@remix-run/react'
import { type VariantProps, cva } from 'cva'
import { twMerge } from 'tailwind-merge'

import { useDisclosure } from '../utils/useDisclosure'
import { Icon } from './Icon/Icon'

const wrapperStyles = cva(['w-96 h-96 relative overflow-hidden'], {
	variants: {
		location: {
			header: 'md:w-[33rem] md:h-[33rem] xl:w-[39rem] xl:h-[39rem]',
			footer: 'md:w-[27.5rem] md:h-[27.5rem] xl:w-[33rem] xl:h-[33rem]',
		},
	},
})

type LetsTalkProps = VariantProps<typeof wrapperStyles>

export const LetsTalk = (props: LetsTalkProps) => {
	const { isOpen: isHovered, onOpen, onClose } = useDisclosure()
	return (
		<div className={wrapperStyles({ location: props.location })}>
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
						isHovered ? 'opacity-100 arrow-animate' : '-rotate-45 opacity-20',
					)}
				/>
				<h3 className='mb-16'>Let's talk</h3>
			</Link>
		</div>
	)
}
