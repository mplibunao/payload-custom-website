import { m, useMotionTemplate, useMotionValue, useScroll } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { LazyMotionDomAnimation } from '../utils/framerMotion/LazyMotionFeatures'

export interface ParallaxProps {
	className?: string
	yDistance?: number
	children?: React.ReactNode
}

// Only setState if difference in state & current height is this much
const HEIGHT_SCROLL_DIFFERENCE = 200

export const Parallax = ({
	className,
	yDistance = 50,
	children,
}: ParallaxProps): JSX.Element => {
	const { scrollY } = useScroll()
	const [localWindowHeight, setLocalWindowHeight] = useState(window.innerHeight)
	const [scrollYPos, setScrollYPos] = useState<number>()
	const translateY = useMotionValue(0)
	const ref = useRef<HTMLDivElement>(null)
	const { current: node } = ref

	useEffect(() => {
		const onResize = () => {
			if (
				Math.abs(window.innerHeight - localWindowHeight) >
				HEIGHT_SCROLL_DIFFERENCE
			) {
				setLocalWindowHeight(window.innerHeight)
			}
		}
		window.addEventListener('resize', onResize)

		return () => {
			window.removeEventListener('resize', onResize)
		}
		// don't care about deps since effect's only job is to register and remove event listener
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (node) {
			const { y: nodeYPos, height: nodeHeight } = node.getBoundingClientRect()
			const isNotAboveViewport = nodeYPos + nodeHeight > 0
			const isNotBelowViewport = localWindowHeight - nodeYPos > -1000

			// avoid additional work if parallax is below fold
			if (isNotAboveViewport && isNotBelowViewport) {
				const percentOfWindowTraveled = nodeYPos / localWindowHeight
				translateY.set(percentOfWindowTraveled * yDistance)
			}
		}
	}, [localWindowHeight, node, yDistance, translateY, scrollYPos])

	useEffect(() => {
		const unsub = scrollY.on('change', (latest) => setScrollYPos(latest))
		return () => unsub()
	}, [scrollY])

	const transform = useMotionTemplate`translate3d(0, ${translateY}px, 0)`

	return (
		<LazyMotionDomAnimation>
			<m.div
				ref={ref}
				className={twMerge(
					className,
					'transition-transform duration-700 ease-out delay-0 sm:duration-300',
				)}
				style={{ transform }}
			>
				{children}
			</m.div>
		</LazyMotionDomAnimation>
	)
}
