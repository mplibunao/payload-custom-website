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
import { type ImageSource, Media } from '../Media'
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
												<Media {...media} sources={mediaSources[variant]} />
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
		</LazyMotionDomAnimation>
	)
}

//'-top-4 left-[-10%] w-[45%] md:left-[4%] md:w-[28%] xl:top-[-15%] 2xl:left-[-5%] 2xl:w-[22%]',
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

const mediaSources: Record<Variant, ImageSource[]> = {
	media1: [
		{
			type: 'image/avif',
			srcSet: ['portrait-480w-avif', 'portrait-768w-avif'],
			sizes: [
				'45vw',
				'media(min-width: 768px) 28vw',
				'media(min-width: 1536px) 22vw',
			],
		},
		{
			type: 'image/webp',
			srcSet: ['portrait-480w-webp', 'portrait-768w-webp'],
			sizes: [
				'45vw',
				'media(min-width: 768px) 28vw',
				'media(min-width: 1536px) 22vw',
			],
		},
		{
			srcSet: ['portrait-480w', 'portrait-768w'],
			sizes: [
				'45vw',
				'media(min-width: 768px) 28vw',
				'media(min-width: 1536px) 22vw',
			],
		},
	],
	media2: [
		{
			type: 'image/avif',
			srcSet: [
				'landscape-480w-avif',
				'landscape-640w-avif',
				'landscape-768w-avif',
			],
			sizes: ['65vw', 'media(min-width: 768px) 33vw'],
		},
		{
			type: 'image/webp',
			srcSet: [
				'landscape-480w-webp',
				'landscape-640w-webp',
				'landscape-768w-webp',
			],
			sizes: ['65vw', 'media(min-width: 768px) 33vw'],
		},
		{
			srcSet: ['landscape-480w', 'landscape-640w', 'landscape-768w'],
			sizes: ['65vw', 'media(min-width: 768px) 33vw'],
		},
	],
	media3: [
		{
			type: 'image/avif',
			srcSet: ['landscape-480w-avif', 'landscape-640w-avif'],
			sizes: ['media(min-width: 768px) 25vw'],
		},
		{
			type: 'image/webp',
			srcSet: ['landscape-480w-webp', 'landscape-640w-webp'],
			sizes: ['media(min-width: 768px) 25vw'],
		},
		{
			srcSet: ['landscape-480w', 'landscape-640w'],
			sizes: ['media(min-width: 768px) 25vw'],
		},
	],
	media4: [
		{
			type: 'image/avif',
			srcSet: [
				'landscape-480w-avif',
				'landscape-640w-avif',
				'landscape-768w-avif',
				'landscape-1024w-avif',
			],
			sizes: ['65vw', 'media(min-width: 768px) 40vw'],
		},
		{
			type: 'image/webp',
			srcSet: [
				'landscape-480w-webp',
				'landscape-640w-webp',
				'landscape-768w-webp',
				'landscape-1024w-webp',
			],
			sizes: ['65vw', 'media(min-width: 768px) 40vw'],
		},
		{
			srcSet: [
				'landscape-480w',
				'landscape-640w',
				'landscape-768w',
				'landscape-1024w',
			],
			sizes: ['65vw', 'media(min-width: 768px) 40vw'],
		},
	],
	media5: [
		{
			type: 'image/avif',
			srcSet: [
				'portrait-480w-avif',
				'portrait-768w-avif',
				'portrait-1024w-avif',
			],
			sizes: [
				'45vw',
				'media(min-width: 640px) 65vw',
				'media(min-width: 768px) 33vw',
			],
		},
		{
			type: 'image/webp',
			srcSet: [
				'portrait-480w-webp',
				'portrait-768w-webp',
				'portrait-1024w-webp',
			],
			sizes: [
				'45vw',
				'media(min-width: 640px) 65vw',
				'media(min-width: 768px) 33vw',
			],
		},
		{
			srcSet: ['portrait-480w', 'portrait-768w', 'portrait-1024w'],
			sizes: [
				'45vw',
				'media(min-width: 640px) 65vw',
				'media(min-width: 768px) 33vw',
			],
		},
	],
	media6: [
		{
			type: 'image/avif',
			srcSet: [
				'landscape-480w-avif',
				'landscape-640w-avif',
				'landscape-768w-avif',
			],
			sizes: ['media(min-width: 768px) 35vw'],
		},
		{
			type: 'image/webp',
			srcSet: [
				'landscape-480w-webp',
				'landscape-640w-webp',
				'landscape-768w-webp',
			],
			sizes: ['media(min-width: 768px) 35vw'],
		},
		{
			srcSet: ['landscape-480w', 'landscape-640w', 'landscape-768w'],
			sizes: ['media(min-width: 768px) 35vw'],
		},
	],
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
