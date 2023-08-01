import { type Block } from 'payload/types'

import { backgroundColor } from '../fields/backgroundColor'

export const ImageGrid: Block = {
	slug: 'image-grid',
	labels: {
		singular: 'Image Grid',
		plural: 'Image Grids',
	},
	fields: [
		backgroundColor(),
		{
			name: 'content',
			label: 'Content',
			type: 'richText',
		},
		{
			name: 'images',
			label: 'Images',
			type: 'array',
			minRows: 3,
			maxRows: 12,
			fields: [
				{
					type: 'upload',
					name: 'image',
					relationTo: 'media',
					required: true,
				},
				{
					name: 'content',
					label: 'Content',
					type: 'textarea',
				},
			],
		},
	],
}
