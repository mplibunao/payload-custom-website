import { AnimatePresence, m } from 'framer-motion'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Icon } from './Icon/Icon'

const useScrollToTop = () => {
	const [showScroll, setShowScroll] = useState(false)

	const makeScroll = () => {
		window?.scrollTo({ top: 0, behavior: 'smooth' })
	}

	useEffect(() => {
		const checkScroll = () => {
			if (window?.scrollY > 400) {
				setShowScroll(true)
			} else if (window?.scrollY <= 400) {
				setShowScroll(false)
			}
		}

		document?.addEventListener('scroll', checkScroll)

		return () => document?.removeEventListener('scroll', checkScroll)
	}, [])

	return { makeScroll, showScroll }
}

export const ScrollToTop = () => {
	const { makeScroll, showScroll } = useScrollToTop()

	return (
		<AnimatePresence>
			{showScroll && (
				<m.button
					whileHover={{ scale: 1.1 }}
					initial={{ y: '100vh' }}
					animate={{ y: 0 }}
					exit={{ y: '100vh' }}
					transition={{ duration: 0.3 }}
					className={twMerge(
						'hidden sm:block bottom-5 xl:bottom-10 right-3.5 md:right-5 xl:right-10 fixed z-20 cursor-pointer p-1.5 items-center rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white border-transparent text-white hover:opacity-50 bg-gray opacity-100',
					)}
					onClick={makeScroll}
				>
					<Icon
						id='arrow'
						hidden
						label='Scroll to top'
						className='w-10 h-10 text-white font-bold stroke-2 rotate-[-90deg]'
					/>
				</m.button>
			)}
		</AnimatePresence>
	)
}
