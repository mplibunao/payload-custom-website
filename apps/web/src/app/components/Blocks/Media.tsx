import { twMerge } from 'tailwind-merge'
import { type Media as MediaType } from '~/cms/payload-types'
import { MEDIA_LOCAL_DIR } from '~/constants'

// use media.filename if original
type Sizes = keyof NonNullable<MediaType['sizes']> | 'original'
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

export const Media = (props: MediaProps): JSX.Element => {
	const {
		filename,
		className,
		width,
		height,
		sizes,
		alt,
		loading = 'lazy',
		sources,
		fetchPriority = 'auto',
		decoding = 'async',
	} = props

	if (props.mimeType?.includes('video')) {
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

	// render original file if it's less than 1mb
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
			{sources
				? sources?.map((source) => {
						const imageSrcSet = getResponsiveSrcSet(source.srcSet, sizes, props)
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
				  })
				: null}

			{!sources ? (
				<>
					<source
						srcSet={`${imagePrefix}${
							sizes['original-avif']?.filename as string
						}`}
						type='image/avif'
						width={width}
						height={height}
					/>
					<source
						srcSet={`${imagePrefix}${
							sizes['original-webp']?.filename as string
						}`}
						type='image/webp'
						width={width}
						height={height}
					/>
				</>
			) : null}

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

// replace map().filter() with .reduce() to reduce looping since we're already doing a nested loop plus a .sort() after this
export const getResponsiveSrcSet = (
	srcSet: Sizes[],
	sizes: NonNullableSizes,
	originalFile: Pick<MediaType, 'width' | 'filename' | 'filesize'>,
) => {
	return srcSet
		.reduce<string[]>((acc, size) => {
			// since original is not a key of size object, we check for it separately then return media.filename
			if (size === 'original') {
				if (!isLessThan1Mb(originalFile.filesize)) return acc
				const srcSetWidth = originalFile.width ? `${originalFile.width}w` : ''
				acc.push(
					`${imagePrefix}${originalFile.filename as string} ${srcSetWidth}`,
				)
				return acc
			}

			const currentSize = sizes[size]
			if (!currentSize) return acc
			// payload does not upscale images to prevent loss of quality
			if (!currentSize.filename) return acc
			// don't add sizes greater than 1mb for perf reasons
			if (!isLessThan1Mb(currentSize.filesize)) return acc

			const srcSetWidth = currentSize.width ? `${currentSize.width}w` : ''

			acc.push(
				`${imagePrefix}${sizes[size]?.filename as string} ${srcSetWidth}`,
			)
			return acc
		}, [])
		.sort((a, b) => {
			// Order matters in srcset so browser will use image with smaller width if it can
			// Split the strings into parts
			const [_a, widthPartA = ''] = a.split(' ')
			const [_b, widthPartB = ''] = b.split(' ')

			// get '' or length 0 if no width part
			// used isNaN before that's really slow
			const aLength = widthPartA.length
			const bLength = widthPartB.length

			if (aLength > 0 && bLength > 0) {
				// Extract the width values from the strings
				const widthA = parseInt(widthPartA, 10)
				const widthB = parseInt(widthPartB, 10)

				// Compare the widths for sorting
				return widthA - widthB
			} else if (aLength === 0 && bLength === 0) {
				return 0 // Both no w, keep them in the same order
			} else if (aLength === 0) {
				return 1 // Only A is w/o w, place it after B
			} else {
				return -1 // Only B is w/o w, place it after A
			}
		})
		.join(', ')
}

export const getResponsiveSizes = (sizes?: string[]) => sizes?.join(', ')

function isLessThan1Mb(filesize?: number) {
	if (!filesize) return false
	return bytesToMB(filesize) <= 1
}

function bytesToMB(bytes: number) {
	return bytes / (1024 * 1024)
}
