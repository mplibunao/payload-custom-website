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
									sources={[
										{
											type: 'image/avif',
											sizes: ['70vw', 'media(min-width: 640px) 50vw'],
											srcSet: [
												'landscape-480w-avif',
												'landscape-640w-avif',
												'landscape-768w-avif',
												'landscape-1024w-avif',
												'landscape-1280w-avif',
												'landscape-1536w-avif',
												'landscape-1920w-avif',
												'original-avif',
											],
										},
										{
											type: 'image/webp',
											sizes: ['70vw', 'media(min-width: 640px) 50vw'],
											srcSet: [
												'landscape-480w-webp',
												'landscape-640w-webp',
												'landscape-768w-webp',
												'landscape-1024w-webp',
												'landscape-1280w-webp',
												'landscape-1536w-webp',
												'landscape-1920w-webp',
												'original-webp',
											],
										},
										{
											sizes: ['70vw', 'media(min-width: 640px) 50vw'],
											srcSet: [
												'landscape-480w',
												'landscape-640w',
												'landscape-768w',
												'landscape-1024w',
												'landscape-1280w',
												'landscape-1536w',
												'landscape-1920w',
												'original',
											],
										},
									]}
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
								sources={[
									{
										type: 'image/avif',
										sizes: ['50vw', 'media(min-width: 640px) 40vw'],
										srcSet: [
											'portrait-480w-avif',
											'portrait-768w-avif',
											'portrait-1024w-avif',
											'portrait-1280w-avif',
											'portrait-1536w-avif',
											'original-avif',
										],
									},
									{
										type: 'image/webp',
										sizes: ['50vw', 'media(min-width: 640px) 40vw'],
										srcSet: [
											'portrait-480w-webp',
											'portrait-768w-webp',
											'portrait-1024w-webp',
											'portrait-1280w-webp',
											'portrait-1536w-webp',
											'original-webp',
										],
									},
									{
										sizes: ['50vw', 'media(min-width: 640px) 40vw'],
										srcSet: [
											'portrait-480w',
											'portrait-768w',
											'portrait-1024w',
											'portrait-1280w',
											'portrait-1536w',
											'original',
										],
									},
								]}
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
									sources={[
										{
											type: 'image/avif',
											sizes: [
												'64vw',
												'media(min-width: 640px) 55vw',
												'media(min-width: 1920px) 84vw',
											],
											srcSet: [
												'landscape-480w-avif',
												'landscape-640w-avif',
												'landscape-768w-avif',
												'landscape-1024w-avif',
												'landscape-1280w-avif',
												'landscape-1536w-avif',
												'landscape-1920w-avif',
												'landscape-2560w-avif',
												'original-avif',
											],
										},
										{
											type: 'image/webp',
											sizes: [
												'64vw',
												'media(min-width: 640px) 55vw',
												'media(min-width: 1920px) 84vw',
											],
											srcSet: [
												'landscape-480w-webp',
												'landscape-640w-webp',
												'landscape-768w-webp',
												'landscape-1024w-webp',
												'landscape-1280w-webp',
												'landscape-1536w-webp',
												'landscape-1920w-webp',
												'landscape-2560w-webp',
												'original-webp',
											],
										},
										{
											sizes: [
												'64vw',
												'media(min-width: 640px) 55vw',
												'media(min-width: 1920px) 84vw',
											],
											srcSet: [
												'landscape-480w',
												'landscape-640w',
												'landscape-768w',
												'landscape-1024w',
												'landscape-1280w',
												'landscape-1536w',
												'landscape-1920w',
												'landscape-2560w',
												'original',
											],
										},
									]}
								/>
							</div>
						</m.div>
					</div>
				) : null}
			</div>
		</LazyMotionDomAnimation>
	)
}
