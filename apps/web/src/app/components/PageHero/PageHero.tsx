import { cva } from 'cva'
import { twMerge } from 'tailwind-merge'
import { type Page } from '~/cms/payload-types'

import { Media } from '../Blocks/Media'
import { RichText } from '../Blocks/RichText'
import { Grid, Gutter } from '../Layout'
import {
	fullGutterMediaSources,
	contentLeftOfMediaSources,
} from './responsiveHeroSources'

const fadeInAnimation = cva([
	'animate-in slide-in-from-bottom-20 fade-in duration-700 fill-mode-both ease-in',
])

type MinimalPageHeroProps = Pick<Page, 'title' | 'heroContent'>

const MinimalPageHero = ({
	title,
	heroContent,
}: MinimalPageHeroProps): JSX.Element => {
	return (
		<div className='container'>
			<p className={twMerge('label', fadeInAnimation())}>{title}</p>
			<RichText
				content={heroContent}
				className={twMerge(fadeInAnimation(), 'delay-200')}
			/>
		</div>
	)
}

type ContentAboveMediaPageHeroProps = Pick<Page, 'heroMedia' | 'heroContent'>

const ContentAboveMediaPageHero = (
	props: ContentAboveMediaPageHeroProps,
): JSX.Element => {
	return (
		<div className='mb-40'>
			<div className='container'>
				<Grid>
					<div className='col-span-8 md:col-span-10 col-start-1 md:col-start-2'>
						<RichText
							className={twMerge(
								fadeInAnimation(),
								'[&:nth-child(1)]:delay-75 [&:nth-child(2)]:delay-200',
							)}
							content={props.heroContent}
						/>
					</div>
				</Grid>
			</div>
			{typeof props.heroMedia === 'object' ? (
				<Gutter left right>
					<div
						className={twMerge(
							'relative -mt-20 md:-mt-24 delay-300 -z-10',
							fadeInAnimation(),
						)}
					>
						<Media
							{...props.heroMedia}
							loading='eager'
							fetchPriority='high'
							decoding='sync'
							{...fullGutterMediaSources}
						/>
					</div>
				</Gutter>
			) : null}
		</div>
	)
}

type ContentLeftOfMediaPageHeroProps = Pick<
	Page,
	'title' | 'heroContent' | 'heroMedia'
>

const ContentLeftOfMediaPageHero = (props: ContentLeftOfMediaPageHeroProps) => {
	return (
		<div className='relative mb-40'>
			<div className='container'>
				<Grid>
					<div className='col-span-8 md:col-span-10'>
						<div className='pb-40 pt-12'>
							<p className={twMerge('label mb-12', fadeInAnimation())}>
								{props.title}
							</p>
							<RichText
								className={twMerge(fadeInAnimation({ className: 'delay-200' }))}
								content={props.heroContent}
							/>
						</div>
					</div>
				</Grid>
				{typeof props.heroMedia === 'object' ? (
					<div
						className={twMerge(
							fadeInAnimation({
								className:
									'delay-300 absolute top-0 right-0 bottom-0 left-1/2 -z-10',
							}),
						)}
					>
						<Media
							{...props.heroMedia}
							className='h-full absolute top-0 left-0 object-cover object-center'
							loading='eager'
							fetchPriority='high'
							decoding='sync'
							{...contentLeftOfMediaSources}
						/>
					</div>
				) : null}
			</div>
		</div>
	)
}

export type PageHeroProps = Pick<
	Page,
	'title' | 'heroType' | 'heroContent' | 'heroMedia'
>

export const PageHero = (props: PageHeroProps): JSX.Element => {
	switch (props.heroType) {
		case 'contentAboveMedia':
			return (
				<ContentAboveMediaPageHero
					heroContent={props.heroContent}
					heroMedia={props.heroMedia}
				/>
			)
		case 'contentLeftOfMedia':
			return (
				<ContentLeftOfMediaPageHero
					heroContent={props.heroContent}
					heroMedia={props.heroMedia}
					title={props.title}
				/>
			)
		case 'minimal':
			return (
				<MinimalPageHero heroContent={props.heroContent} title={props.title} />
			)
		default:
			return (
				<div>
					<RichText content={props.heroContent} />
				</div>
			)
	}
}
