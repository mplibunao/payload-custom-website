import { type MediaBlockType } from '~/cms/payload-types'

import {
	FullScreenMediaBlock,
	NormalMediaBlock,
	WideMediaBlock,
} from './MediaBlock'

export const MediaBlock = ({ media, caption, type }: MediaBlockType) => {
	if (typeof media === 'string') {
		return null
	}

	switch (type) {
		case 'fullscreen':
			return <FullScreenMediaBlock caption={caption} media={media} />
		case 'wide':
			return <WideMediaBlock caption={caption} media={media} />
		case 'normal':
			return <NormalMediaBlock caption={caption} media={media} />
		default:
			return null
	}
}
