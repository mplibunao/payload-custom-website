import { type Block } from 'payload/types'

export const MediaCollage: Block = {
	slug: 'media-collage',
	interfaceName: 'MediaCollageBlockType',
	labels: {
		singular: 'Media Collage',
		plural: 'Media Collages',
	},
	fields: [
		{
			name: 'media',
			label: 'Media',
			type: 'array',
			required: true,
			minRows: 3,
			maxRows: 3,
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
