import { type Page } from 'payload/generated-types'
import { Suspense } from 'react'

import { Skeleton } from '../ui/skeleton'
import { ContentBlock, MediaBlock } from './sections/LazyComponents'

type BlockTypes = Page['layout'][number]['blockType']

const components: Record<BlockTypes, React.LazyExoticComponent<any>> = {
	content: ContentBlock,
	media: MediaBlock,
}

type Props = {
	layout: Page['layout']
	className?: string
}

export const RenderBlocks = ({ layout, className }: Props) => (
	<div className={className}>
		{layout?.map((block) => {
			const Block: React.FC<any> = components[block.blockType]

			if (Block) {
				return (
					<Suspense key={block.id} fallback={<Skeleton />}>
						<section key={block.id}>
							<Block {...block} />
						</section>
					</Suspense>
				)
			}

			return null
		})}
	</div>
)
