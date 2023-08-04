import { type Block } from 'payload/types'

import { stat } from '../fields/stat'

export const ImageStatCollage: Block = {
	slug: 'image-stat-collage',
	labels: {
		singular: 'Image Stat Collage',
		plural: 'Image Stat Collages',
	},
	fields: [
		{
			name: 'stats',
			label: 'Statistics',
			type: 'array',
			minRows: 1,
			maxRows: 3,
			fields: [stat],
		},
		{
			name: 'images',
			label: 'Images',
			type: 'array',
			minRows: 3,
			maxRows: 6,
			fields: [
				{
					type: 'upload',
					name: 'image',
					relationTo: 'media',
					required: true,
				},
			],
		},
	],
}
