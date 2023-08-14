import { type VariantProps, cva } from 'cva'
import { type Props } from 'payload/components/fields/Text'
import { useFieldType, Label } from 'payload/components/forms'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import './styles.scss'

import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from '~/app/components/ui/tooltip'

const colorStyles = cva(['h-8 w-8 mr-3 rounded-full cursor-pointer'], {
	variants: {
		color: {
			none: '',
			orange: 'bg-orange',
			black: 'bg-black',
			blue: 'bg-blue',
			gray: 'bg-gray',
			red: 'bg-red',
			yellow: 'bg-yellow',
		},
	},
	defaultVariants: {
		color: 'none',
	},
})

type Colors = NonNullable<VariantProps<typeof colorStyles>['color']>

export const colors: Array<Colors> = [
	'none',
	'orange',
	'black',
	'blue',
	'gray',
	'red',
	'yellow',
]

export const ColorPickerInput: React.FC<Props> = ({
	path = '',
	label,
	required,
}) => {
	const { value = '', setValue } = useFieldType({
		path,
		validate: validateColor,
	})

	return (
		<div className='custom-color-picker pb-2'>
			<Label htmlFor={path} label={label} required={required} />
			<ul className='flex flex-wrap list-none p-0 m-0'>
				{colors.map((color) => (
					<li key={color}>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										type='button'
										className={twMerge(
											'chip',
											color === value ? 'chip--selected' : '',
											colorStyles({ color }),
										)}
										aria-label={color}
										onClick={() => setValue(color)}
									/>
								</TooltipTrigger>
								<TooltipContent className='capitalize'>{color}</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</li>
				))}
			</ul>
		</div>
	)
}

export function validateColor(value: string = ''): true | string {
	return (
		colors.includes(value) ||
		'Please select a valid color from the available color palette'
	)
}
