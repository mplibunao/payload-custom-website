import { twMerge } from 'tailwind-merge'
import { type Media as MediaType } from '~/cms/payload-types'
import { MEDIA_LOCAL_DIR } from '~/constants'

import { RichText } from '../RichText'

export type MediaProps = MediaType & {
	className?: {
		wrapper?: string
		media?: string
	}
	preferredSize?: keyof NonNullable<MediaType['sizes']>
	caption?: {
		[k: string]: unknown
	}[]
	loading?: React.ImgHTMLAttributes<HTMLImageElement>['loading']
	fetchPriority?: 'high' | 'low' | 'auto'
}

const imagePrefix = `${MEDIA_LOCAL_DIR}/`

export const Media = ({
	filename,
	mimeType,
	className = {},
	width,
	height,
	sizes,
	preferredSize,
	alt,
	caption,
	loading,
}: //fetchPriority,
MediaProps): JSX.Element => {
	if (mimeType?.includes('video')) {
		return (
			<div className={className.wrapper}>
				<video
					autoPlay
					muted
					loop
					controls={false}
					className={twMerge('max-w-full w-full', className.media)}
				>
					<source src={`${imagePrefix}${filename as string}`} />
				</video>
			</div>
		)
	}

	/*
	 * use preferred size if caller passes it as props
	 * fallback to original webp image
	 * last fallback is original non-webp image
	 */
	let filenameToRender = filename
	if (sizes) {
		if (preferredSize && sizes[preferredSize]) {
			filenameToRender = sizes[preferredSize]?.filename
			height = sizes[preferredSize]?.height
			width = sizes[preferredSize]?.width
		} else if (sizes['original-webp']) {
			filenameToRender = sizes['original-webp'].filename
			height = sizes['original-webp'].height
			width = sizes['original-webp'].width
		}
	}
	return (
		<div className={className.wrapper}>
			<img
				src={`${imagePrefix}${filenameToRender as string}`}
				alt={alt}
				width={width}
				height={height}
				className={twMerge('max-w-full w-full', className.media)}
				loading={loading}
			/>
			{caption && <RichText content={caption} />}
		</div>
	)
}
