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
			// Original size
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

			// Card (4:3)
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

			// square (1:1)
			{
				name: 'square-512w-webp',
				width: 512,
				height: 512,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'square-512w-avif',
				width: 512,
				height: 512,
				formatOptions: {
					format: 'avif',
				},
			},
			{
				name: 'square-512w',
				width: 512,
				height: 512,
			},
			{
				name: 'square-768w-webp',
				width: 768,
				height: 768,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'square-768w-avif',
				width: 768,
				height: 768,
				formatOptions: {
					format: 'avif',
				},
			},
			{
				name: 'square-768w',
				width: 768,
				height: 768,
			},
			{
				name: 'square-1024w-webp',
				width: 1024,
				height: 1024,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'square-1024w-avif',
				width: 1024,
				height: 1024,
				formatOptions: {
					format: 'avif',
				},
			},
			{
				name: 'square-1024w',
				width: 1024,
				height: 1024,
			},
			{
				name: 'square-1280w-webp',
				width: 1280,
				height: 1280,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'square-1280w-avif',
				width: 1280,
				height: 1280,
				formatOptions: {
					format: 'avif',
				},
			},
			{
				name: 'square-1280w',
				width: 1280,
				height: 1280,
			},

			// Portrait (3:4)
			{
				name: 'portrait-480w-webp',
				width: 480,
				height: 640,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'portrait-480w-avif',
				width: 480,
				height: 640,
				formatOptions: {
					format: 'avif',
				},
			},
			{
				name: 'portrait-480w',
				width: 480,
				height: 640,
			},
			{
				name: 'portrait-768w-webp',
				width: 768,
				height: 1024,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'portrait-768w-avif',
				width: 768,
				height: 1024,
				formatOptions: {
					format: 'avif',
				},
			},
			{
				name: 'portrait-768w',
				width: 768,
				height: 1024,
			},
			{
				name: 'portrait-1024w-webp',
				width: 1024,
				height: 1365,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'portrait-1024w-avif',
				width: 1024,
				height: 1365,
				formatOptions: {
					format: 'avif',
				},
			},
			{
				name: 'portrait-1024w',
				width: 1024,
				height: 1365,
			},
			{
				name: 'portrait-1280w-webp',
				width: 1280,
				height: 1707,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'portrait-1280w-avif',
				width: 1280,
				height: 1707,
				formatOptions: {
					format: 'avif',
				},
			},
			{
				name: 'portrait-1280w',
				width: 1280,
				height: 1707,
			},
			{
				name: 'portrait-1536w-webp',
				width: 1536,
				height: 2048,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'portrait-1536w-avif',
				width: 1536,
				height: 2048,
				formatOptions: {
					format: 'avif',
				},
			},
			{
				name: 'portrait-1536w',
				width: 1536,
				height: 2048,
			},

			// landscape 3:2
			{
				name: 'landscape-480w-webp',
				width: 480,
				height: 320,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'landscape-480w-avif',
				width: 480,
				height: 320,
				formatOptions: {
					format: 'avif',
				},
			},
			{
				name: 'landscape-480w',
				width: 480,
				height: 320,
			},
			{
				name: 'landscape-640w-webp',
				width: 640,
				height: 427,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'landscape-640w-avif',
				width: 640,
				height: 427,
				formatOptions: {
					format: 'avif',
				},
			},
			{
				name: 'landscape-640w',
				width: 640,
				height: 427,
			},
			{
				name: 'landscape-768w-webp',
				width: 768,
				height: 512,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'landscape-768w-avif',
				width: 768,
				height: 512,
				formatOptions: {
					format: 'avif',
				},
			},
			{
				name: 'landscape-768w',
				width: 768,
				height: 512,
			},
			{
				name: 'landscape-1024w-webp',
				width: 1024,
				height: 683,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'landscape-1024w-avif',
				width: 1024,
				height: 683,
				formatOptions: {
					format: 'avif',
				},
			},
			{
				name: 'landscape-1024w',
				width: 1024,
				height: 683,
			},
			{
				name: 'landscape-1280w-webp',
				width: 1280,
				height: 853,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'landscape-1280w-avif',
				width: 1280,
				height: 853,
				formatOptions: {
					format: 'avif',
				},
			},
			{
				name: 'landscape-1280w',
				width: 1280,
				height: 853,
			},
			{
				name: 'landscape-1536w-webp',
				width: 1536,
				height: 1024,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'landscape-1536w-avif',
				width: 1536,
				height: 1024,
				formatOptions: {
					format: 'avif',
				},
			},
			{
				name: 'landscape-1536w',
				width: 1536,
				height: 1024,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'landscape-1920w-webp',
				width: 1920,
				height: 1280,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'landscape-1920w-avif',
				width: 1920,
				height: 1280,
				formatOptions: {
					format: 'avif',
				},
			},
			{
				name: 'landscape-1920w',
				width: 1920,
				height: 1280,
			},
			{
				name: 'landscape-2560w-webp',
				width: 2560,
				height: 1706,
				formatOptions: {
					format: 'webp',
				},
			},
			{
				name: 'landscape-2560w-avif',
				width: 2560,
				height: 1706,
				formatOptions: {
					format: 'avif',
				},
			},
			{
				name: 'landscape-2560w',
				width: 2560,
				height: 1706,
			},

			// og
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
