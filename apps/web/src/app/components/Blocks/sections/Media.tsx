import { twMerge } from 'tailwind-merge'
import { type Media as MediaType } from '~/cms/payload-types'

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

const imagePrefix = '/media/assets/'

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

	let filenameToRender = filename
	if (sizes && preferredSize && sizes[preferredSize]) {
		filenameToRender = sizes[preferredSize]?.filename
		height = sizes[preferredSize]?.height
		width = sizes[preferredSize]?.width
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
