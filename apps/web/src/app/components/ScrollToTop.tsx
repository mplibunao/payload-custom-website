import {
	AnimatePresence,
	m,
	useMotionValueEvent,
	useReducedMotion,
	useScroll,
} from 'framer-motion'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { LazyMotionDomAnimation } from '../utils/framerMotion/LazyMotionFeatures'
import { Icon } from './Icon/Icon'

export const ScrollToTop = () => {
	const shouldReduceMotion = useReducedMotion()
	const [showScroll, setShowScroll] = useState(false)
	const { scrollY } = useScroll()
	useMotionValueEvent(scrollY, 'change', (latest) => {
		if (latest > 400 && showScroll === false) {
			setShowScroll(true)
		} else if (latest <= 400 && showScroll === true) {
			setShowScroll(false)
		}
	})
	const initial = shouldReduceMotion ? { opacity: 0 } : { y: '100vh' }

	return (
		<LazyMotionDomAnimation>
			<AnimatePresence>
				{showScroll && (
					<m.button
						whileHover={{ scale: 1.1 }}
						initial={initial}
						animate={shouldReduceMotion ? { opacity: 1 } : { y: 0 }}
						exit={initial}
						transition={{ duration: 0.3 }}
						className={twMerge(
							'hidden sm:block bottom-5 xl:bottom-10 right-3.5 md:right-5 xl:right-10 fixed z-20 cursor-pointer p-1.5 items-center rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white border-transparent text-white hover:opacity-50 bg-gray opacity-100',
						)}
						onClick={() => window?.scrollTo({ top: 0, behavior: 'smooth' })}
					>
						<Icon
							id='arrow'
							hidden
							label='Scroll to top'
							className='w-10 h-10 text-white font-bold stroke-2 -rotate-90'
						/>
					</m.button>
				)}
			</AnimatePresence>
		</LazyMotionDomAnimation>
	)
}
