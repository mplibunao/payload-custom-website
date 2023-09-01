export interface RedHeadlineProps {
	children?: React.ReactNode
}

export const RedHeadline = (props: RedHeadlineProps): JSX.Element => {
	return <span className='text-red uppercase'>{props.children}</span>
}
