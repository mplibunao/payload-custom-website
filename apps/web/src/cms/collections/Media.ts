import path from 'path'
import { type CollectionConfig } from 'payload/types'
import { MEDIA_LOCAL_DIR } from '~/constants'

export const Media: CollectionConfig = {
	slug: 'media',
	access: {
		read: (): boolean => true, // Everyone can read Media
	},
	upload: {
		staticDir: path.resolve(__dirname, `../../..${MEDIA_LOCAL_DIR}`),
		staticURL: MEDIA_LOCAL_DIR,
		disableLocalStorage: process.env.NODE_ENV === 'production',
		adminThumbnail: 'card-webp',
		imageSizes: [
			{
				name: 'original-webp',
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'original-avif',
				formatOptions: {
					format: 'avif',
				},
			},
			{
				name: 'card-webp',
				width: 640,
				height: 480,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'card-avif',
				width: 640,
				height: 480,
				formatOptions: {
					format: 'avif',
				},
			},
			{
				name: 'card',
				width: 640,
				height: 480,
			},
			{
				name: 'portrait-webp',
				width: 768,
				height: 1024,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'portrait-avif',
				width: 768,
				height: 1024,
				formatOptions: {
					format: 'avif',
				},
			},
			{
				name: 'portrait',
				width: 768,
				height: 1024,
			},
			{
				name: 'square-webp',
				width: 1200,
				height: 1200,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'square-avif',
				width: 1200,
				height: 1200,
				formatOptions: {
					format: 'avif',
				},
			},
			{
				name: 'square',
				width: 1200,
				height: 1200,
			},
			{
				name: 'feature-webp',
				width: 1024,
				height: 576,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'feature-avif',
				width: 1024,
				height: 576,
				formatOptions: {
					format: 'avif',
				},
			},
			{
				name: 'feature',
				width: 1024,
				height: 576,
			},
			{
				name: 'og',
				width: 1200,
				height: 630,
				formatOptions: {
					format: 'jpg',
				},
			},
		],
	},
	fields: [
		{
			name: 'alt',
			label: 'Alt Text',
			type: 'text',
			required: true,
		},
	],
}
