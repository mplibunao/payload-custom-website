import path from 'path'
import { type CollectionConfig } from 'payload/types'

export const Media: CollectionConfig = {
	slug: 'media',
	access: {
		read: (): boolean => true, // Everyone can read Media
	},
	upload: {
		staticDir: path.resolve(__dirname, '../../../media'),
		staticURL: '/media',
		disableLocalStorage: process.env.NODE_ENV === 'production',
		formatOptions: {
			format: 'webp',
		},
		adminThumbnail: 'card',
		imageSizes: [
			{
				name: 'card',
				width: 640,
				height: 480,
			},
			{
				name: 'feature',
				width: 1024,
				height: 576,
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
