import { type Block } from 'payload/types'

import { backgroundColor } from '../fields/backgroundColor'

export const Slider: Block = {
	slug: 'slider',
	labels: {
		singular: 'Slider',
		plural: 'Sliders',
	},
	fields: [
		backgroundColor(),
		{
			name: 'images',
			label: 'Images',
			type: 'array',
			minRows: 3,
			maxRows: 9,
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
