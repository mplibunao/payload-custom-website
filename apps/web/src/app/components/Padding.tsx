import { cva } from 'cva'
import { twMerge } from 'tailwind-merge'
import { type ContentBlockType } from '~/cms/payload-types'

type PaddingTop = ContentBlockType['paddingTop']
type PaddingBottom = ContentBlockType['paddingBottom']

const paddingStyles = cva([], {
	variants: {
		top: {
			none: '',
			small: 'pt-12',
			medium: 'pt-24 md:pt-40',
			large: 'pt-48 md:pt-60',
		} satisfies Record<PaddingTop, string>,
		bottom: {
			none: '',
			small: 'pb-12',
			medium: 'pb-24 md:pb-40',
			large: 'pb-48 md:pb-60',
		} satisfies Record<PaddingBottom, string>,
	},
	defaultVariants: {
		top: 'none',
		bottom: 'none',
	},
})

export interface PaddingProps {
	top: PaddingTop
	bottom: PaddingBottom
	children?: React.ReactNode
}

export const Padding = ({
	top,
	bottom,
	children,
}: PaddingProps): JSX.Element => {
	return (
		<div className={twMerge(paddingStyles({ top, bottom }))}>{children}</div>
	)
}
