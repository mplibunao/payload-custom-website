import { type Block } from 'payload/types'

import { colorField } from '../fields/ColorPicker/colorPickerField'

export const StudySlider: Block = {
	slug: 'study-slider',
	labels: {
		singular: 'Study Slider',
		plural: 'Study Sliders',
	},
	fields: [
		colorField({ name: 'backgroundColor', label: 'Background Color' }),
		{
			name: 'studies',
			type: 'relationship',
			relationTo: 'studies',
			hasMany: true,
			required: true,
		},
	],
}
