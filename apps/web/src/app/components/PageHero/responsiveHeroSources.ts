import { type ImageSource } from '../Blocks/Media'

export const contentAboveMediaSources: ImageSource[] = [
	{
		type: 'image/avif',
		sizes: [
			'100vw',
			'media(min-width: 1280px) 80vw',
			'media(min-width: 1920px) 70vw',
		],
		srcSet: ['card-avif', 'portrait-avif', 'square-avif'],
	},
	{
		type: 'image/webp',
		sizes: [
			'100vw',
			'media(min-width: 1280px) 80vw',
			'media(min-width: 1920px) 70vw',
		],
		srcSet: ['card-webp', 'portrait-webp', 'square-webp'],
	},
	{
		sizes: [
			'100vw',
			'media(min-width: 1280px) 80vw',
			'media(min-width: 1920px) 70vw',
		],
		srcSet: ['card', 'portrait', 'square'],
	},
]

export const contentLeftOfMediaSources: ImageSource[] = [
	{
		type: 'image/avif',
		sizes: ['50vw'],
		srcSet: ['portrait-avif'],
	},
	{
		type: 'image/webp',
		sizes: ['50vw'],
		srcSet: ['portrait-webp'],
	},
	{ sizes: ['50vw'], srcSet: ['portrait'] },
]
