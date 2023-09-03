import { cva } from 'cva'
import { twMerge } from 'tailwind-merge'
import {
	type ColorsRecord,
	type Colors,
} from '~/cms/fields/ColorPicker/colorPickerField'

export interface BackgroundColorProps {
	color: Colors
	children?: React.ReactNode
	className?: string
}

const backgroundColorStyles = cva([], {
	variants: {
		color: {
			none: '',
			blue: 'bg-blue',
			red: 'bg-red text-antique',
			orange: 'bg-orange',
			gray: 'bg-gray text-antique',
			yellow: 'bg-yellow',
			black: 'bg-black text-antique',
		} satisfies ColorsRecord,
	},
	defaultVariants: {
		color: 'none',
	},
})

export const BackgroundColor = (props: BackgroundColorProps): JSX.Element => {
	return (
		<div
			className={twMerge(
				backgroundColorStyles({
					color: props.color,
					className: props.className,
				}),
			)}
		>
			{props.children}
		</div>
	)
}
