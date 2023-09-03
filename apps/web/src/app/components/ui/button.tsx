import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'cva'
import * as React from 'react'
import { cn } from '~/app/utils/misc.ts'
import { type ColorsRecord } from '~/cms/fields/ColorPicker/colorPickerField'

const buttonVariants = cva(
	'cursor-pointer rounded-3xl bg-gray border-0 py-0 px-12 h-24 inline-flex items-center my-12 mx-auto shadow-none label',
	{
		variants: {
			color: {
				none: 'text-antique',
				orange: 'text-orange',
				black: 'bg-black',
				blue: 'text-blue',
				gray: 'text-gray',
				red: 'text-red',
				yellow: 'text-yellow',
			} satisfies ColorsRecord,
		},
		defaultVariants: {
			color: 'none',
		},
	},
)

export interface ButtonProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, color, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({ color, className }))}
				ref={ref}
				{...props}
			/>
		)
	},
)
Button.displayName = 'Button'

export { Button, buttonVariants }
