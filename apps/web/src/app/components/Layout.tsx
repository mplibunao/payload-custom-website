import { twMerge } from 'tailwind-merge'

export type ContainerProps = {
	children?: React.ReactNode
}

export const Container = (props: ContainerProps): JSX.Element => {
	return <div className='max-w-4xl mx-auto'>{props.children}</div>
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
