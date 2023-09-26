import { twMerge } from 'tailwind-merge'
import { imagorService } from '~/app/utils/imagor.service'
import { type Media as MediaType } from '~/cms/payload-types'
import { MEDIA_LOCAL_DIR } from '~/constants'

type ImageType = 'image/avif' | 'image/webp' | 'image/jpeg'

type SrcSet = {
	src: string
	width: number
}

type SrcBreakpoints = number
export type ResponsiveSrc =
	| {
			srcSets: undefined
			srcBreakpoints: SrcBreakpoints[]
	  }
	| {
			srcSets: SrcSet[]
			srcBreakpoints: undefined
	  }
	| {}

export type ResponsiveImageConfig = {
	srcSizes?: string[]
} & ResponsiveSrc

export type MediaProps = {
	className?: string
	loading?: React.ImgHTMLAttributes<HTMLImageElement>['loading']
	fetchPriority?: 'high' | 'low' | 'auto'
	decoding?: 'auto' | 'async' | 'sync'
	srcSizes?: string[]
} & MediaType &
	ResponsiveSrc

export const imagePrefix = `${MEDIA_LOCAL_DIR}/`

export const Media = (props: MediaProps): JSX.Element => {
	const { loading = 'lazy', fetchPriority = 'auto', decoding = 'async' } = props

	if (props.mimeType?.includes('video')) {
		return (
			<video
				autoPlay
				muted
				loop
				controls={false}
				className={twMerge('max-w-full w-full', props.className)}
			>
				<source src={props.url as string} />
			</video>
		)
	}

	const srcSets = 'srcSets' in props ? props.srcSets : undefined
	const srcBreakpoints =
		'srcBreakpoints' in props ? props.srcBreakpoints : undefined

	return (
		<picture>
			{['image/avif', 'image/webp', 'image/jpeg'].map((format) => {
				const imageSrcSet = getSrcSet(
					props.filename as string,
					srcSets,
					srcBreakpoints,
					format as ImageType,
				)

				return (
					<source
						type={format}
						sizes={getResponsiveSizes(props.srcSizes)}
						srcSet={imageSrcSet}
						key={`${imageSrcSet}${format ?? 'original'}`}
					/>
				)
			})}

			<img
				src={props.url as string}
				alt={props.alt}
				className={twMerge('max-w-full w-full', props.className)}
				loading={loading}
				fetchpriority={fetchPriority}
				decoding={decoding}
			/>
		</picture>
	)
}

// https://www.industrialempathy.com/posts/avif-webp-quality-settings/#:~:text=If%20you%20usually%20encode%20JPEGs,than%20the%20equivalent%20JPEG%20image.
const getImageQuality = (format?: ImageType) => {
	switch (format) {
		case 'image/avif':
			return 51
		case 'image/webp':
			return 64
		case 'image/jpeg':
		default:
			return 60
	}
}

export const getSrcSet = (
	filename: string,
	srcSets?: SrcSet[],
	srcBreakpoints?: number[],
	format?: ImageType,
) => {
	const imageFormat = format ? format.replace('image/', '') : undefined
	const quality = getImageQuality(format)

	// default breakpoints while keeping aspect ratio
	if (
		!srcSets ||
		srcSets.length === 0 ||
		!srcBreakpoints ||
		srcBreakpoints.length === 0
	) {
		return [480, 640, 768, 1024, 1280, 1536, 1920, 2560]
			.map((width) => {
				const url = imagorService
					.resize(width, 0)
					.smartCrop(true)
					.setImagePath(filename)
					.filter(`quality(${quality})`)
					.filter(imageFormat ? `format(${imageFormat})` : undefined)
					.buildUrl()
				return `${url} ${width}w`
			})
			.join(', ')
	}

	// simpler api is to just provide the widths or breakpoints you want to generate an image
	// then we create the srcset based on that similar to the default
	if (srcBreakpoints) {
		return srcBreakpoints
			.sort((a, b) => a - b)
			.map((srcBreakpoint) => {
				const url = imagorService
					.resize(srcBreakpoint, 0)
					.smartCrop(true)
					.setImagePath(filename)
					.filter(`quality(${quality})`)
					.filter(imageFormat ? `format(${imageFormat})` : undefined)
					.buildUrl()
				return `${url} ${srcBreakpoint}w`
			})
			.join(', ')
	}

	return srcSets
		.map((srcSet) => {
			// if you need more control for the transformation like changing format, flip v/h, etc
			// More verbose
			return `${srcSet.src} ${srcSet.width}w`
		})
		.sort((a, b) => {
			// Order matters in srcset so browser will use image with smaller width if it can
			// Split the strings into parts
			const [_a, widthPartA] = a.split(' ')
			const [_b, widthPartB] = b.split(' ')

			// shouldn't happen since ${width}w is required but keep in same order if ever
			if (!widthPartA || !widthPartB) return 0

			// Extract the width values from the strings
			const widthA = parseInt(widthPartA, 10)
			const widthB = parseInt(widthPartB, 10)
			return widthA - widthB
		})
		.join(', ')
}

export const getResponsiveSizes = (sizes?: string[]) => sizes?.join(', ')
