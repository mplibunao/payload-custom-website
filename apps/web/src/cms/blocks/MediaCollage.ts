import { type Block } from 'payload/types'

export const MediaCollage: Block = {
	slug: 'media-collage',
	labels: {
		singular: 'Media Collage',
		plural: 'Media Collages',
	},
	fields: [
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
