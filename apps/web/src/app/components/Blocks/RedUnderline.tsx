import { useInView } from 'react-intersection-observer'
import { twMerge } from 'tailwind-merge'

export interface RedUnderlineProps {
	children?: React.ReactNode
}

export const RedUnderline = (props: RedUnderlineProps): JSX.Element => {
	const { ref, inView } = useInView({
		rootMargin: '0% 0% -25% 0%',
		fallbackInView: false,
		threshold: [0, 0.5, 1.0],
	})

	return (
		<span
			className={twMerge(
				'text-current bg-no-repeat bg-[100%_100%] relative red-underline',
				inView
					? 'text-red red-underline-in md:bg-[50%_100%]'
					: 'bg-[0%_100%] red-underline-out',
			)}
			ref={ref}
		>
			{props.children}
		</span>
	)
}
