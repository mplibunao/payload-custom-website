import { type VariantProps, cva } from 'cva'
import {
	type MotionValue,
	m,
	useReducedMotion,
	useScroll,
	useTransform,
} from 'framer-motion'
import React from 'react'
import { LazyMotionDomAnimation } from '~/app/utils/framerMotion/LazyMotionFeatures'
import { type MediaContentCollageBlockType } from '~/cms/payload-types'

import { BackgroundColor } from '../../BackgroundColor'
import { Grid, Gutter } from '../../Layout'
import { SiteLink } from '../../SiteLink'
import { Button } from '../../ui/button'
import { Media, type ResponsiveImageConfig } from '../Media'
import { RichText } from '../RichText'
import { getParallaxTranslateYOutput, parallaxStyles } from '../parallaxUtils'

type MediaProps = VariantProps<typeof mediaStyles>
type Variant = NonNullable<MediaProps['variant']>

export const MediaContentCollageBlock = (
	props: MediaContentCollageBlockType,
): JSX.Element => {
	const shouldReduceMotion = useReducedMotion()
	const ref = React.useRef(null)
	const { scrollYProgress } = useScroll({
		offset: ['start end', 'end start'],
		target: ref,
	})
	const y = useMediaCollageScrollTransform(scrollYProgress)

	const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5])
	const opacityStyle = { opacity }
	return (
		<LazyMotionDomAnimation>
			<div ref={ref}>
				<Gutter left right className='overflow-hidden py-32 md:py-44'>
					<BackgroundColor
						color={props.backgroundColor.color}
						className='text-center relative py-60 md:py-96 px-0'
					>
						{props.media.length > 0 ? (
							<ul>
								{props.media.map(({ media, id }, i) => {
									if (typeof media === 'string') return null
									const variant = `media${i + 1}` as Variant

									return (
										<li
											key={id ?? i}
											className={mediaStyles({
												variant,
											})}
										>
											<m.div
												className={parallaxStyles()}
												style={
													shouldReduceMotion ? opacityStyle : { y: y[variant] }
												}
											>
												<div>
													<Media {...media} {...mediaSources[variant]} />
												</div>
											</m.div>
										</li>
									)
								})}
							</ul>
						) : null}

						<div className='container'>
							<Grid>
								<div className='col-start-1 md:col-start-2 col-span-10'>
									<RichText
										content={props.content}
										className='relative content-collage-rich-text'
									/>
									{props.enableCTA && props.link ? (
										<SiteLink
											{...props.link}
											prefetch='viewport'
											className='relative'
										>
											<Button color={props.backgroundColor.color}>
												{props.link.label}
											</Button>
										</SiteLink>
									) : null}
								</div>
							</Grid>
						</div>
					</BackgroundColor>
				</Gutter>
			</div>
		</LazyMotionDomAnimation>
	)
}

const mediaStyles = cva(['absolute list-none m-0 p-0'], {
	variants: {
		variant: {
			media1:
				'-top-10 left-[-10%] w-[45%] xs:top-[-15%] sm:top-[-30%] md:top-[-5%] md:left-[4%] md:w-[28%] 2xl:left-[-5%] 2xl:w-[22%] 3xl:top-[-20%]',
			media2:
				'top-[-5%] left-[70%] w-[65%] md:top-[15%] md:right-[-10%] md:w-1/3',
			media3: 'hidden md:list-item md:w-1/4 md:top-1/2 md:right-[-5%]',
			media4:
				'max-md:top-[75%] max-md:left-[60%] w-[65%] md:right-[5%] top-[90%] 2xl:right-[10%] md:w-[40%]',
			media5:
				'top-3/4 left-[-3%] w-[45%] sm:top-[70%] sm:left-[-30%] sm:w-[65%] md:top-[80%] md:left-[5%] md:w-1/3',
			media6: 'hidden md:list-item md:top-1/2 md:left-[-15%] md:w-[35%]',
		},
	},
})

const mediaSources: Record<Variant, ResponsiveImageConfig> = {
	media1: {
		srcSizes: ['portrait-480w-avif', 'portrait-768w-avif'],
		srcBreakpoints: [{ width: 480 }, { width: 640 }, { width: 768 }],
	},
	media2: {
		srcSizes: ['65vw', 'media(min-width: 768px) 33vw'],
		srcBreakpoints: [{ width: 480 }, { width: 640 }, { width: 768 }],
	},
	media3: {
		srcSizes: ['media(min-width: 768px) 25vw'],
		srcBreakpoints: [{ width: 480 }, { width: 640 }],
	},
	media4: {
		srcSizes: ['65vw', 'media(min-width: 768px) 40vw'],
		srcBreakpoints: [
			{ width: 480 },
			{ width: 640 },
			{ width: 768 },
			{ width: 1024 },
		],
	},
	media5: {
		srcSizes: [
			'45vw',
			'media(min-width: 640px) 65vw',
			'media(min-width: 768px) 33vw',
		],
		srcBreakpoints: [
			{ width: 480 },
			{ width: 640 },
			{ width: 768 },
			{ width: 1024 },
		],
	},
	media6: {
		srcSizes: ['media(min-width: 768px) 35vw'],
		srcBreakpoints: [{ width: 480 }, { width: 640 }, { width: 768 }],
	},
}

const useMediaCollageScrollTransform = (
	scrollYProgress: MotionValue<number>,
) => {
	const inputRange = [0, 1]
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
		media1: medium,
		media2: fast,
		media3: fast,
		media4: medium,
		media5: medium,
		media6: fast,
	}
}
