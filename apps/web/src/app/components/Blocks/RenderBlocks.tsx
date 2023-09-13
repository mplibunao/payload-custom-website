import { type Page } from 'payload/generated-types'
import { Suspense } from 'react'

import { Skeleton } from '../ui/skeleton'
import {
	ContentBlock,
	MediaBlock,
	CTABlock,
	CTAGridBlock,
	MediaCollageBlock,
} from './sections/LazyComponents'

type BlockTypes = Page['layout'][number]['blockType']

const components: Record<BlockTypes, React.LazyExoticComponent<any>> = {
	content: ContentBlock,
	media: MediaBlock,
	cta: CTABlock,
	'cta-grid': CTAGridBlock,
	'media-collage': MediaCollageBlock,
}

type Props = {
	layout: Page['layout']
	className?: string
}

export const RenderBlocks = ({ layout, className }: Props) => (
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
						<section key={block.id ?? i}>
							<Block {...block} />
						</section>
					</Suspense>
				)
			}

			return null
		})}
	</div>
)
