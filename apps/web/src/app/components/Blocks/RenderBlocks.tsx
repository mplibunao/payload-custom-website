import { type Page } from 'payload/generated-types'
import React, { Suspense } from 'react'

import { Skeleton } from '../ui/skeleton'

const ContentBlock = React.lazy(() =>
	import('./sections/ContentBlock').then((module) => ({
		default: module.ContentBlock,
	})),
)
const MediaBlock = React.lazy(() =>
	import('./sections/MediaBlock').then((module) => ({
		default: module.MediaBlock,
	})),
)
const CTABlock = React.lazy(() =>
	import('./sections/CallToActionBlock').then((module) => ({
		default: module.CallToActionBlock,
	})),
)
const CTAGridBlock = React.lazy(() =>
	import('./sections/CTAGridBlock').then((module) => ({
		default: module.CTAGridBlock,
	})),
)
const MediaCollageBlock = React.lazy(() =>
	import('./sections/MediaCollageBlock').then((module) => ({
		default: module.MediaCollageBlock,
	})),
)
const MediaContentCollageBlock = React.lazy(() =>
	import('./sections/MediaContentCollageBlock').then((module) => ({
		default: module.MediaContentCollageBlock,
	})),
)
const MediaGridBlock = React.lazy(() =>
	import('./sections/MediaGridBlock').then((module) => ({
		default: module.MediaGridBlock,
	})),
)

type BlockTypes = Page['layout'][number]['blockType']

const components: Record<BlockTypes, React.LazyExoticComponent<any>> = {
	cta: CTABlock,
	'cta-grid': CTAGridBlock,
	content: ContentBlock,
	media: MediaBlock,
	'media-collage': MediaCollageBlock,
	'media-content-collage': MediaContentCollageBlock,
	'media-grid': MediaGridBlock,
}

type Props = {
	layout: Page['layout']
	heroType: Page['heroType']
	className?: string
}

export const RenderBlocks = ({ layout, className, heroType }: Props) => (
	<div className={className}>
		{layout?.map((block, i) => {
			const Block: React.FC<any> = components[block.blockType]

			if (Block) {
				return (
					<Suspense
						key={block.id ?? i}
						fallback={
							<div className='w-full flex items-center space-x-4 justify-center md:py-5 py-2'>
								<Skeleton className='h-12 w-12 rounded-full md:h-20 md:w-20' />
								<div className='space-y-2 md:space-y-3'>
									<Skeleton className='h-4 w-[250px] md:h-6 md:w-96' />
									<Skeleton className='h-4 w-[200px] md:h-6 md:w-80' />
								</div>
							</div>
						}
					>
						<section
							key={block.id ?? i}
							className={
								i === 0 && heroType === 'minimal'
									? ''
									: 'content-visibility-auto'
							}
						>
							<Block {...block} />
						</section>
					</Suspense>
				)
			}

			return null
		})}
	</div>
)
