export type GridContainerProps = {
	children?: React.ReactNode
}

export const GridContainer = (props: GridContainerProps): JSX.Element => {
	return <div className='max-w-4xl mx-auto'>{props.children}</div>
}

export const gridOverflow = 'w-24'

export type GridProps = {
	children?: React.ReactNode
}

export const Grid = (props: GridProps): JSX.Element => {
	return (
		<div className='grid grid-cols-8 lg:grid-cols-12 gap-8'>
			{props.children}
		</div>
	)
}
