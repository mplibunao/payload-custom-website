import { twMerge } from 'tailwind-merge'

export type ContainerProps = {
	children?: React.ReactNode
	className?: string
}

export const Container = (props: ContainerProps): JSX.Element => {
	return (
		<div className={twMerge('max-w-5xl mx-auto px-12', props.className)}>
			{props.children}
		</div>
	)
}

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
				props.left ? 'pl-0 xl:pl-40' : '',
				props.right ? 'pr-0 xl:pr-40' : '',
			)}
		>
			{props.children}
		</div>
	)
}
