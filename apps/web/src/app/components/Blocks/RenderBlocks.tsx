import { type Page } from 'payload/generated-types'

import { Content as content } from './sections/Content'
import { Image as image } from './sections/Image'

const components = {
	content,
	image,
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
					<section key={i}>
						<Block {...block} />
					</section>
				)
			}

			return null
		})}
	</div>
)
