import { type Page } from '~/cms/payload-types'

import { RichText } from '../RichText'

type ImageProps = Page['layout'][number]

export const Image = (props: ImageProps) => {
	if (props.blockType !== 'image') return null
	const { image, type, caption } = props

	if (typeof image === 'object') {
		let filenameToRender = image.filename
		let { width, height } = image
		if (image.sizes && image.sizes[type]) {
			filenameToRender = image.sizes[type]?.filename
			height = image.sizes[type]?.height
			width = image.sizes[type]?.width
		}

		return (
			<div>
				<img
					src={`/media/${filenameToRender as string}`}
					alt={image.alt}
					width={width}
					height={height}
				/>
				{caption && <RichText content={caption} />}
			</div>
		)
	}

	return null
}
