import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { LazyMotionDomAnimation } from '~/app/utils/framerMotion/LazyMotionFeatures'
import {
	type MediaBlockType,
	type Media as MediaType,
} from '~/cms/payload-types'

import { Gutter } from '../../Layout'
import { Media } from '../Media'
import { RichText } from '../RichText'
import { getParallaxTranslateYOutput, parallaxStyles } from '../parallaxUtils'

export const MediaBlock = ({ media, caption, type }: MediaBlockType) => {
	if (typeof media === 'string') {
		return null
	}

	switch (type) {
		case 'fullscreen':
			return <FullScreenMedia caption={caption} media={media} />
		case 'wide':
			return (
				<Gutter left right>
					<div className='w-full max-w-full'>
						<Media
							{...media}
							sources={[
								{
									type: 'image/avif',
									sizes: [
										'100vw',
										'media(min-width: 1280px) 80vw',
										'media(min-width: 1920px) 70vw',
									],
									srcSet: [
										'landscape-480w-avif',
										'square-512w-avif',
										'square-768w-avif',
										'square-1024w-avif',
										'square-1280w-avif',
										'landscape-1536w-avif',
										'landscape-1920w-avif',
										'landscape-2560w-avif',
										'original-avif',
									],
								},
								{
									type: 'image/webp',
									sizes: [
										'100vw',
										'media(min-width: 1280px) 80vw',
										'media(min-width: 1920px) 70vw',
									],
									srcSet: [
										'landscape-480w-webp',
										'square-512w-webp',
										'square-768w-webp',
										'square-1024w-webp',
										'square-1280w-webp',
										'landscape-1536w-webp',
										'landscape-1920w-webp',
										'landscape-2560w-webp',
										'original-webp',
									],
								},
								{
									sizes: [
										'100vw',
										'media(min-width: 1280px) 80vw',
										'media(min-width: 1920px) 70vw',
									],
									srcSet: [
										'landscape-480w',
										'square-512w',
										'square-768w',
										'square-1024w',
										'square-1280w',
										'landscape-1536w',
										'landscape-1920w',
										'landscape-2560w',
										'original',
									],
								},
							]}
						/>
						{caption ? <RichText content={caption} /> : null}
					</div>
				</Gutter>
			)
		case 'normal':
			return (
				<div className='container'>
					<div className='w-full max-w-full'>
						<Media
							{...media}
							sources={[
								{
									type: 'image/avif',
									sizes: [
										'80vw',
										'media(min-width: 764px) 90vw',
										'media(min-width: 1024px) 80vw',
										'media(min-width: 1280px) 63vw',
										'media(min-width: 1563px) 51vw',
										'media(min-width: 1920px) 42vw',
									],
									srcSet: [
										'landscape-480w-avif',
										'landscape-640w-avif',
										'landscape-768w-avif',
										'landscape-1024w-avif',
									],
								},
								{
									type: 'image/webp',
									sizes: [
										'80vw',
										'media(min-width: 764px) 90vw',
										'media(min-width: 1024px) 80vw',
										'media(min-width: 1280px) 63vw',
										'media(min-width: 1563px) 51vw',
										'media(min-width: 1920px) 42vw',
									],
									srcSet: [
										'landscape-480w-webp',
										'landscape-640w-webp',
										'landscape-768w-webp',
										'landscape-1024w-webp',
									],
								},
								{
									sizes: [
										'80vw',
										'media(min-width: 764px) 90vw',
										'media(min-width: 1024px) 80vw',
										'media(min-width: 1280px) 63vw',
										'media(min-width: 1563px) 51vw',
										'media(min-width: 1920px) 42vw',
									],
									srcSet: [
										'landscape-480w',
										'landscape-640w',
										'landscape-768w',
										'landscape-1024w',
									],
								},
							]}
						/>
						{caption ? <RichText content={caption} /> : null}
					</div>
				</div>
			)
		default:
			return null
	}
}

const FullScreenMedia = (props: {
	caption: MediaBlockType['caption']
	media: MediaType
}) => {
	const shouldReduceMotion = useReducedMotion()
	const ref = useRef(null)
	const { scrollYProgress } = useScroll({
		offset: ['start end', 'end start'],
		target: ref,
	})
	const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5])
	const y = useTransform(
		scrollYProgress,
		[0, 1],
		getParallaxTranslateYOutput(100),
	)
	return (
		<div className='h-screen relative overflow-hidden' ref={ref}>
			<LazyMotionDomAnimation>
				<m.div
					className={twMerge('absolute inset-0', parallaxStyles())}
					style={shouldReduceMotion ? { opacity } : { y }}
				>
					<div className='fullscreen-media relative bottom-28'>
						<Media
							{...props.media}
							className='h-full w-full object-cover'
							sources={[
								{
									type: 'image/avif',
									sizes: [
										'100vw',
										'media(min-width: 1280px) 80vw',
										'media(min-width: 1920px) 70vw',
									],
									srcSet: [
										'portrait-480w-avif',
										'portrait-768w-avif',
										'portrait-1024w-avif',
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
										'100vw',
										'media(min-width: 1280px) 80vw',
										'media(min-width: 1920px) 70vw',
									],
									srcSet: [
										'portrait-480w-webp',
										'portrait-768w-webp',
										'portrait-1024w-webp',
										'landscape-1280w-webp',
										'landscape-1536w-webp',
										'landscape-1920w-webp',
										'landscape-2560w-webp',
										'original-webp',
									],
								},
								{
									sizes: [
										'100vw',
										'media(min-width: 1280px) 80vw',
										'media(min-width: 1920px) 70vw',
									],
									srcSet: [
										'portrait-480w',
										'portrait-768w',
										'portrait-1024w',
										'landscape-1280w',
										'landscape-1536w',
										'landscape-1920w',
										'landscape-2560w',
										'original',
									],
								},
							]}
						/>
						{props.caption ? <RichText content={props.caption} /> : null}
					</div>
				</m.div>
			</LazyMotionDomAnimation>
		</div>
	)
}
