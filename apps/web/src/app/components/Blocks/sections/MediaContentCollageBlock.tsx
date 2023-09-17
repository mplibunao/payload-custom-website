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
import { Container, Grid, Gutter } from '../../Layout'
import { SiteLink } from '../../SiteLink'
import { Button } from '../../ui/button'
import { Media } from '../Media'
import { RichText } from '../RichText'
import { getParallaxTranslateYOutput, parallaxStyles } from '../parallaxUtils'

const mediaStyles = cva(['absolute'], {
	variants: {
		variant: {
			media1:
				'-top-40 left-[-10%] w-[45%] md:left-[4%] md:w-[28%] xl:top-[-15%] 2xl:left-[-5%] 2xl:w-[22%]',
			media2:
				'top-[-5%] left-[70%] w-[65%] md:top-[15%] md:right-[-10%] md:w-1/3',
			media3: 'hidden md:list-item md:w-1/4 md:top-1/2 md:right-[-5%]',
			media4:
				'max-md:top-[75%] max-md:left-[60%] w-[65%] md:right-[5%] top-[90%] 2xl:right-[10%] md:w-[40%]',
			media5:
				'top-3/4 left-[-3%] w-[45%] sm:top-[70%] sm:left-[-45%] sm:w-[65%] md:top-[80%] md:left-[5%] md:w-1/3',
			media6: 'hidden md:list-item md:top-1/2 md:left-[-15%] md:w-[35%]',
		},
	},
})

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
												<Media {...media} />
											</div>
										</m.div>
									</li>
								)
							})}
						</ul>
					) : null}

					<Container>
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
					</Container>
				</BackgroundColor>
			</Gutter>
		</LazyMotionDomAnimation>
	)
}

const useMediaCollageScrollTransform = (
	scrollYProgress: MotionValue<number>,
) => {
	const inputRange = [0, 1]
	return {
		media1: useTransform(
			scrollYProgress,
			inputRange,
			getParallaxTranslateYOutput(100),
		),
		media2: useTransform(
			scrollYProgress,
			inputRange,
			getParallaxTranslateYOutput(150),
		),
		media3: useTransform(
			scrollYProgress,
			inputRange,
			getParallaxTranslateYOutput(150),
		),
		media4: useTransform(
			scrollYProgress,
			inputRange,
			getParallaxTranslateYOutput(100),
		),
		media5: useTransform(
			scrollYProgress,
			inputRange,
			getParallaxTranslateYOutput(100),
		),
		media6: useTransform(
			scrollYProgress,
			inputRange,
			getParallaxTranslateYOutput(150),
		),
	}
}
