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
							srcSizes={[
								'100vw',
								'media(min-width: 1280px) 80vw',
								'media(min-width: 1920px) 70vw',
							]}
							srcBreakpoints={[480, 640, 768, 1024, 1280, 1536, 1920, 2560]}
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
							srcSizes={[
								'80vw',
								'media(min-width: 764px) 90vw',
								'media(min-width: 1024px) 80vw',
								'media(min-width: 1280px) 63vw',
								'media(min-width: 1563px) 51vw',
								'media(min-width: 1920px) 42vw',
							]}
							srcBreakpoints={[480, 640, 768, 1024]}
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
							srcSizes={[
								'100vw',
								'media(min-width: 1280px) 80vw',
								'media(min-width: 1920px) 70vw',
							]}
							srcBreakpoints={[480, 640, 768, 1024, 1280, 1536, 1920, 2560]}
						/>
						{props.caption ? <RichText content={props.caption} /> : null}
					</div>
				</m.div>
			</LazyMotionDomAnimation>
		</div>
	)
}
