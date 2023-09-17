import { twMerge } from 'tailwind-merge'
import { type Media as MediaType } from '~/cms/payload-types'
import { MEDIA_LOCAL_DIR } from '~/constants'

type Sizes = keyof NonNullable<MediaType['sizes']>
type NonNullableSizes = NonNullable<MediaType['sizes']>

/*
 * 1. For fallback purposes if browser doesn't support avif or webp
 * 2. For responsive images (render different size depending on viewport)
 */
export type ImageSource = {
	type?: 'image/avif' | 'image/webp'
	srcSet: Sizes[]
	sizes?: string[]
	media?: string
}

export interface MediaProps extends MediaType {
	className?: string
	loading?: React.ImgHTMLAttributes<HTMLImageElement>['loading']
	fetchPriority?: 'high' | 'low' | 'auto'
	sources?: ImageSource[]
	decoding?: 'auto' | 'async' | 'sync'
}

export const imagePrefix = `${MEDIA_LOCAL_DIR}/`

export const Media = ({
	filename,
	mimeType,
	className,
	width,
	height,
	sizes,
	alt,
	loading = 'lazy',
	sources,
	fetchPriority = 'auto',
	decoding = 'async',
}: MediaProps): JSX.Element => {
	if (mimeType?.includes('video')) {
		return (
			<video
				autoPlay
				muted
				loop
				controls={false}
				className={twMerge('max-w-full w-full', className)}
			>
				<source src={`${imagePrefix}${filename as string}`} />
			</video>
		)
	}

	// render original file
	if (!sizes) {
		return (
			<img
				src={`${imagePrefix}${filename as string}`}
				alt={alt}
				width={width}
				height={height}
				className={twMerge('max-w-full w-full', className)}
				loading={loading}
				fetchpriority={fetchPriority}
				decoding={decoding}
			/>
		)
	}

	return (
		<picture>
			{sources?.map((source) => {
				const imageSrcSet = getResponsiveSrcSet(source.srcSet, sizes)
				const imageSizes = getResponsiveSizes(source.sizes)

				return (
					<source
						key={`${imageSrcSet}${imageSizes ?? ''}`}
						srcSet={imageSrcSet}
						sizes={imageSizes}
						type={source.type}
						media={source.media}
					/>
				)
			})}

			<source
				srcSet={`${imagePrefix}${sizes['original-avif']?.filename as string}`}
				type='image/avif'
				width={width}
				height={height}
			/>
			<source
				srcSet={`${imagePrefix}${sizes['original-webp']?.filename as string}`}
				type='image/webp'
				width={width}
				height={height}
			/>
			<img
				src={`${imagePrefix}${filename as string}`}
				alt={alt}
				width={width}
				height={height}
				className={twMerge('max-w-full w-full', className)}
				loading={loading}
				fetchpriority={fetchPriority}
				decoding={decoding}
			/>
		</picture>
	)
}

export const getResponsiveSrcSet = (
	srcSet: Sizes[],
	sizes: NonNullableSizes,
) => {
	return srcSet
		.map((size) => {
			const currentSize = sizes[size]
			if (!currentSize) return undefined

			const srcSetWidth = currentSize.width ? `${currentSize.width}w` : ''

			return `${imagePrefix}${sizes[size]?.filename as string} ${srcSetWidth}`
		})
		.filter(Boolean)
		.join(', ')
}

export const getResponsiveSizes = (sizes?: string[]) => sizes?.join(', ')
