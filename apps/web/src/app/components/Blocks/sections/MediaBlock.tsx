import { type MediaBlockType } from '~/cms/payload-types'

import { Media } from './Media'

interface MediaBlockProps extends MediaBlockType {}

export const MediaBlock = ({ media, caption }: MediaBlockProps) => {
	if (typeof media === 'object') {
		return <Media {...media} caption={caption} />
	}

	return null
}
