import { twMerge } from 'tailwind-merge'

import { type IconProps, Icon } from './Icon'

export const Logo = ({
	className,
	...props
}: Omit<IconProps, 'id'>): JSX.Element => {
	return (
		<Icon
			id='logo'
			className={twMerge('bg-orange p-4', className)}
			label='logo'
			role='img'
			{...props}
		/>
	)
}
