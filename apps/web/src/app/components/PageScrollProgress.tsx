import { m, useScroll } from 'framer-motion'

import { LazyMotionDomAnimation } from '../utils/framerMotion/LazyMotionFeatures'

export const PageScrollProgress = (): JSX.Element => {
	const { scrollYProgress } = useScroll()
	return (
		<LazyMotionDomAnimation>
			<m.div
				style={{ scaleX: scrollYProgress }}
				className='fixed top-0 inset-x-0 h-2 bg-red origin-left z-40'
			/>
		</LazyMotionDomAnimation>
	)
}
