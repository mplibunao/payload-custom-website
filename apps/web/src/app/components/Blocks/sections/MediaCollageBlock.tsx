import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { LazyMotionDomAnimation } from '~/app/utils/framerMotion/LazyMotionFeatures'
import { type MediaCollageBlockType } from '~/cms/payload-types'

import { Media } from '../Media'
import { getParallaxTranslateYOutput, parallaxStyles } from '../parallaxUtils'

export const MediaCollageBlock = (
	props: MediaCollageBlockType,
): JSX.Element => {
	const shouldReduceMotion = useReducedMotion()
	const ref = React.useRef(null)
	const { scrollYProgress } = useScroll({
		offset: ['start end', 'end start'],
		target: ref,
	})

	const image1Y = useTransform(
		scrollYProgress,
		[0, 1],
		getParallaxTranslateYOutput(150),
	)
	const image2Y = useTransform(
		scrollYProgress,
		[0, 1],
		getParallaxTranslateYOutput(100),
	)
	const image3Y = useTransform(
		scrollYProgress,
		[0, 1],
		getParallaxTranslateYOutput(100),
	)
	const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5])
	const opacityStyle = { opacity }

	const [media1, media2, media3] = props.media

	return (
		<LazyMotionDomAnimation>
			<div ref={ref}>
				<div className='block sm:flex max-md:pb-16 items-center pb-28'>
					{media1 && typeof media1.media === 'object' ? (
						<m.div
							className={twMerge(
								'min-w-[50%] max-sm:pb-0 max-xs:pt-16 max-sm:max-w-[70%] max-md:pb-28',
								parallaxStyles(),
							)}
							style={shouldReduceMotion ? opacityStyle : { y: image1Y }}
						>
							<div>
								<Media
									{...media1.media}
									srcSizes={['70vw', 'media(min-width: 640px) 50vw']}
								/>
							</div>
						</m.div>
					) : null}

					{media2 && typeof media2.media === 'object' ? (
						<m.div
							className={twMerge(
								'max-xs:max-w-[80%] max-sm:max-w-[65%] max-sm:ml-auto max-md:pl-16 pl-28',
								parallaxStyles(),
							)}
							style={shouldReduceMotion ? opacityStyle : { y: image2Y }}
						>
							<Media
								{...media2.media}
								srcSizes={['50vw', 'media(min-width: 640px) 40vw']}
								srcBreakpoints={[480, 640, 768, 1024, 1280, 1536]}
							/>
						</m.div>
					) : null}
				</div>

				{media3 && typeof media3.media === 'object' ? (
					<div className='grid grid-cols-12'>
						<m.div
							className={parallaxStyles({
								class:
									'col-start-2 col-span-12 3xl:col-span-10 3xl:col-start-2',
							})}
							style={shouldReduceMotion ? opacityStyle : { y: image3Y }}
						>
							<div className='max-sm:-m-9 max-w-[70%] sm:max-w-[60%] 3xl:max-w-full'>
								<Media
									{...media3.media}
									srcSizes={[
										'64vw',
										'media(min-width: 640px) 55vw',
										'media(min-width: 1920px) 84vw',
									]}
									srcBreakpoints={[480, 640, 768, 1024, 1280, 1536, 1920, 2560]}
								/>
							</div>
						</m.div>
					</div>
				) : null}
			</div>
		</LazyMotionDomAnimation>
	)
}
