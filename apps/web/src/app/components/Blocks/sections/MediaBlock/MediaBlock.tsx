import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { LazyMotionDomAnimation } from '~/app/utils/framerMotion/LazyMotionFeatures'
import {
	type MediaBlockType,
	type Media as MediaType,
} from '~/cms/payload-types'

import { Gutter } from '../../../Layout'
import { Media } from '../../Media'
import { RichText } from '../../RichText'
import {
	getParallaxTranslateYOutput,
	parallaxStyles,
} from '../../parallaxUtils'

interface MediaBlockProps {
	caption: MediaBlockType['caption']
	media: MediaType
}

export const WideMediaBlock = (props: MediaBlockProps): JSX.Element => {
	return (
		<Gutter left right>
			<div className='w-full max-w-full'>
				<Media
					{...props.media}
					srcSizes={[
						'100vw',
						'media(min-width: 1280px) 80vw',
						'media(min-width: 1920px) 70vw',
					]}
				/>
				{props.caption ? <RichText content={props.caption} /> : null}
			</div>
		</Gutter>
	)
}

export const FullScreenMediaBlock = (props: MediaBlockProps) => {
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
						/>
						{props.caption ? <RichText content={props.caption} /> : null}
					</div>
				</m.div>
			</LazyMotionDomAnimation>
		</div>
	)
}

export const NormalMediaBlock = (props: MediaBlockProps): JSX.Element => {
	return (
		<div className='container'>
			<div className='w-full max-w-full'>
				<Media
					{...props.media}
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
				{props.caption ? <RichText content={props.caption} /> : null}
			</div>
		</div>
	)
}
