import {
	type MotionValue,
	m,
	useReducedMotion,
	useScroll,
	useTransform,
} from 'framer-motion'
import React from 'react'
import { LazyMotionDomAnimation } from '~/app/utils/framerMotion/LazyMotionFeatures'
import { useMediaQuery } from '~/app/utils/useMediaQuery'
import { type MediaGridBlockType } from '~/cms/payload-types'

import { BackgroundColor } from '../../BackgroundColor'
import { Grid, Gutter } from '../../Layout'
import { Media } from '../Media'
import { RichText } from '../RichText'
import { getParallaxTranslateYOutput, parallaxStyles } from '../parallaxUtils'

export const MediaGridBlock = (props: MediaGridBlockType): JSX.Element => {
	const shouldReduceMotion = useReducedMotion()
	const ref = React.useRef(null)
	const { scrollYProgress } = useScroll({
		offset: ['start end', 'end start'],
		target: ref,
	})
	const isLarge = useMediaQuery('only screen and (min-width: 1024px)', false)
	const y = useMediaGridScrollTransform(scrollYProgress)

	const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5])
	const opacityStyle = { opacity }

	return (
		<LazyMotionDomAnimation>
			<div className='pt-0 xs:pt-32 md:py-44' ref={ref}>
				{props.content ? (
					<div className='container'>
						<Grid>
							<div className='col-span-8 md:col-span-6'>
								<RichText content={props.content} />
							</div>
						</Grid>
					</div>
				) : null}

				<div className='relative'>
					<Gutter
						left
						className='absolute top-[10%] right-0 bottom-[10%] left-0'
					>
						<BackgroundColor
							color={props.backgroundColor.color}
							className='h-full'
						/>
					</Gutter>

					<div className='container'>
						<Grid>
							{props.media?.map(({ media, content, id }, i) => {
								if (typeof media === 'string') return null

								let style
								if (shouldReduceMotion) {
									style = opacityStyle
								} else {
									style = isLarge ? { y: y.large[i % 3] } : { y: y.small }
								}

								return (
									<div className='col-span-4' key={id ?? i}>
										<m.div
											className={parallaxStyles({ className: 'relative' })}
											style={style}
										>
											<Media
												{...media}
												className='text-antique align-middle'
												srcSizes={[
													'(max-width: 479px) 36w',
													'(min-width: 480px) 40w',
													'(min-width: 1024px) 29w',
													'(min-width: 1280px) 23w',
													'(min-width: 1536px) 19w',
													'(min-width: 1920px) 15w',
												]}
												srcBreakpoints={[
													{ width: 360, height: 480 },
													{ width: 480, height: 640 },
												]}
											/>
											{content ? (
												<div className='p text-xs md:text-base flex items-end absolute inset-0 p-4 whitespace-pre-wrap tracking-wide md:tracking-normal md:leading-8 bg-gradient-to-b from-gray/0 via-gray/20 to-gray/80 text-antique'>
													{content}
												</div>
											) : null}
										</m.div>
									</div>
								)
							})}
						</Grid>
					</div>
				</div>
			</div>
		</LazyMotionDomAnimation>
	)
}

const useMediaGridScrollTransform = (scrollYProgress: MotionValue<number>) => {
	const inputRange = [0, 1]
	const slow = useTransform(
		scrollYProgress,
		inputRange,
		getParallaxTranslateYOutput(50),
	)
	const medium = useTransform(
		scrollYProgress,
		inputRange,
		getParallaxTranslateYOutput(100),
	)
	const fast = useTransform(
		scrollYProgress,
		inputRange,
		getParallaxTranslateYOutput(150),
	)

	return {
		large: [slow, fast, medium],
		small: useTransform(
			scrollYProgress,
			inputRange,
			getParallaxTranslateYOutput(0),
		),
	}
}
