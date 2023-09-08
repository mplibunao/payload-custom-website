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
		adminThumbnail: 'card',
		imageSizes: [
			{
				name: 'original-webp',
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'card',
				width: 640,
				height: 480,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'portrait',
				width: 768,
				height: 1024,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'square',
				width: 1200,
				height: 1200,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'feature',
				width: 1024,
				height: 576,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'og',
				width: 1200,
				height: 630,
				formatOptions: {
					format: 'webp',
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
