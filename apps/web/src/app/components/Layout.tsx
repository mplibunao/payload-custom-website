import { twMerge } from 'tailwind-merge'

export type GridProps = {
	children?: React.ReactNode
	className?: string
}

export const Grid = (props: GridProps): JSX.Element => {
	return (
		<div
			className={twMerge(
				'grid grid-cols-8 lg:grid-cols-12 gap-8',
				props.className,
			)}
		>
			{props.children}
		</div>
	)
}

export type GutterProps = {
	children?: React.ReactNode
	className?: string
	left?: boolean
	right?: boolean
}

export const Gutter = (props: GutterProps): JSX.Element => {
	return (
		<div
			className={twMerge(
				props.className,
				props.left ? 'pl-0 xl:pl-40 3xl:pl-72' : '',
				props.right ? 'pr-0 xl:pr-40 3xl:pr-72' : '',
			)}
		>
			{props.children}
		</div>
	)
}
