import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { LazyMotionDomAnimation } from '~/app/utils/framerMotion/LazyMotionFeatures'
import {
	type MediaBlockType,
	type Media as MediaType,
} from '~/cms/payload-types'

import { Container, Gutter } from '../../Layout'
import { fullGutterMediaSources } from '../../PageHero/responsiveHeroSources'
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
							//sources={fullGutterMediaSources}
							{...media}
							//sources={[
							//{
							//type: 'image/avif',
							//sizes: [
							//'100vw',
							//'media(min-width: 1280px) 80vw',
							//'media(min-width: 1920px) 70vw',
							//],
							//srcSet: [
							//'square-512w-avif',
							//'square-768w-avif',
							//'square-1200w-avif',
							//'original-avif',
							//],
							//},
							//]}
						/>
						{caption ? <RichText content={caption} /> : null}
					</div>
				</Gutter>
			)
		case 'normal':
			return (
				<Container>
					<div className='w-full max-w-full'>
						<Media
							{...media}
							//sources={[
							//{
							//type: 'image/avif',
							//sizes: [
							//'80vw',
							//'media(min-width: 764px) 90vw',
							//'media(min-width: 1024px) 80vw',
							//'media(min-width: 1280px) 63vw',
							//'media(min-width: 1563px) 51vw',
							//'media(min-width: 1920px) 42vw',
							//],
							//srcSet: ['card-avif', 'portrait-avif', 'square-avif'],
							//},
							//{
							//type: 'image/webp',
							//sizes: [
							//'80vw',
							//'media(min-width: 764px) 90vw',
							//'media(min-width: 1024px) 80vw',
							//'media(min-width: 1280px) 63vw',
							//'media(min-width: 1563px) 51vw',
							//'media(min-width: 1920px) 42vw',
							//],
							//srcSet: ['card-webp', 'portrait-webp', 'square-webp'],
							//},
							//{
							//sizes: [
							//'80vw',
							//'media(min-width: 764px) 90vw',
							//'media(min-width: 1024px) 80vw',
							//'media(min-width: 1280px) 63vw',
							//'media(min-width: 1563px) 51vw',
							//'media(min-width: 1920px) 42vw',
							//],
							//srcSet: ['card', 'portrait', 'square'],
							//},
							//]}
						/>
						{caption ? <RichText content={caption} /> : null}
					</div>
				</Container>
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
							//sources={[
							//{
							//type: 'image/avif',
							//srcSet: ['portrait-avif', 'square-avif', 'original-avif'],
							//sizes: ['100vw'],
							//},
							//{
							//type: 'image/webp',
							//srcSet: ['portrait-webp', 'square-webp', 'original-webp'],
							//sizes: ['100vw'],
							//},
							//{
							//srcSet: ['portrait', 'square', 'original'],
							//sizes: ['100vw'],
							//},
							//]}
						/>
						{props.caption ? <RichText content={props.caption} /> : null}
					</div>
				</m.div>
			</LazyMotionDomAnimation>
		</div>
	)
}
