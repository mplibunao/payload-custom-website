import { type MediaBlockType } from '~/cms/payload-types'

import { Media } from './Media'

type MediaBlockProps = MediaBlockType

export const MediaBlock = ({ media, type, caption }: MediaBlockProps) => {
	if (typeof media === 'object') {
		return <Media {...media} preferredSize={type} caption={caption} />
	}

	return null
}
