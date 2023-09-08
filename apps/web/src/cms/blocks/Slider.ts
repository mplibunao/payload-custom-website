import { type Block } from 'payload/types'

import { colorField } from '../fields/ColorPicker/colorPickerField'

export const Slider: Block = {
	slug: 'slider',
	labels: {
		singular: 'Slider',
		plural: 'Sliders',
	},
	fields: [
		colorField({ name: 'backgroundColor', label: 'Background Color' }),
		{
			name: 'slides',
			labels: {
				singular: 'Slide',
				plural: 'Slides',
			},
			type: 'array',
			minRows: 3,
			maxRows: 9,
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
