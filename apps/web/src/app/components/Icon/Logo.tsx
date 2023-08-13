// @ts-ignore
import React from 'react'
// ^ this is needed when replacing components in payload
import { twMerge } from 'tailwind-merge'

import { type IconProps, Icon } from './Icon'

export const Logo = ({
	className,
	...props
}: Omit<IconProps, 'id'>): JSX.Element => {
	return (
		<Icon
			id='logo'
			className={twMerge('bg-red w-14 h-14 p-4', className)}
			label='logo'
			role='img'
			{...props}
		/>
	)
}
