import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { LazyMotionDomAnimation } from '~/app/utils/framerMotion/LazyMotionFeatures'
import {
	type MediaBlockType,
	type Media as MediaType,
} from '~/cms/payload-types'

import { Container, Gutter } from '../../Layout'
import { Media } from '../Media'
import { RichText } from '../RichText'
import { getParallaxTranslateYOutput, parallaxStyles } from '../parallaxUtils'

export const MediaBlock = ({ media, caption, type }: MediaBlockType) => {
	if (typeof media === 'string') {
		return null
	}

	if (type === 'fullscreen') {
		return <FullScreenMedia caption={caption} media={media} />
	}

	if (type === 'wide') {
		return (
			<Gutter left right>
				<div className='w-full max-w-full'>
					<Media {...media} loading='lazy' />
					{caption ? <RichText content={caption} /> : null}
				</div>
			</Gutter>
		)
	}

	return (
		<Container>
			<div className='w-full max-w-full'>
				<Media {...media} loading='lazy' />
				{caption ? <RichText content={caption} /> : null}
			</div>
		</Container>
	)
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
							loading='lazy'
						/>
						{props.caption ? <RichText content={props.caption} /> : null}
					</div>
				</m.div>
			</LazyMotionDomAnimation>
		</div>
	)
}
