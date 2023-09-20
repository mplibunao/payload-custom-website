import { type ImageSource } from '../Blocks/Media'

export const fullGutterMediaSources: ImageSource[] = [
	{
		type: 'image/avif',
		sizes: [
			'100vw',
			'media(min-width: 1280px) 80vw',
			'media(min-width: 1920px) 70vw',
		],
		srcSet: [
			'landscape-480w-avif',
			'landscape-640w-avif',
			'landscape-768w-avif',
			'landscape-1024w-avif',
			'landscape-1280w-avif',
			'landscape-1536w-avif',
			'landscape-1920w-avif',
			'landscape-2560w-avif',
			'original-avif',
		],
	},
	{
		type: 'image/webp',
		sizes: [
			'100vw',
			'media(min-width: 1280px) 80vw',
			'media(min-width: 1920px) 70vw',
		],
		srcSet: [
			'landscape-480w-webp',
			'landscape-640w-webp',
			'landscape-768w-webp',
			'landscape-1024w-webp',
			'landscape-1280w-webp',
			'landscape-1536w-webp',
			'landscape-1920w-webp',
			'landscape-2560w-webp',
			'original-webp',
		],
	},
	{
		sizes: [
			'100vw',
			'media(min-width: 1280px) 80vw',
			'media(min-width: 1920px) 70vw',
		],
		srcSet: [
			'landscape-480w',
			'landscape-640w',
			'landscape-768w',
			'landscape-1024w',
			'landscape-1280w',
			'landscape-1536w',
			'landscape-1920w',
			'landscape-2560w',
			'original',
		],
	},
]

export const contentLeftOfMediaSources: ImageSource[] = [
	{
		type: 'image/avif',
		sizes: ['50vw'],
		srcSet: [
			'portrait-768w-avif',
			'landscape-1024w-avif',
			'landscape-1280w-avif',
			'landscape-1536w-avif',
			'landscape-1920w-avif',
			'original-avif',
		],
	},
	{
		type: 'image/webp',
		sizes: ['50vw'],
		srcSet: [
			'portrait-768w-webp',
			'landscape-1024w-webp',
			'landscape-1280w-webp',
			'landscape-1536w-webp',
			'landscape-1920w-webp',
			'original-webp',
		],
	},
	{
		sizes: ['50vw'],
		srcSet: [
			'portrait-768w',
			'landscape-1024w',
			'landscape-1280w',
			'landscape-1536w',
			'landscape-1920w',
			'original',
		],
	},
]
