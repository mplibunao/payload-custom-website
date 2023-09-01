import { type Block } from 'payload/types'

import { stat } from '../fields/stat'

export const MediaStatCollage: Block = {
	slug: 'media-stat-collage',
	labels: {
		singular: 'Media Stat Collage',
		plural: 'Media Stat Collages',
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
			name: 'media',
			label: 'Media',
			type: 'array',
			minRows: 3,
			maxRows: 6,
			fields: [
				{
					type: 'upload',
					name: 'media',
					relationTo: 'media',
					required: true,
				},
			],
		},
	],
}
