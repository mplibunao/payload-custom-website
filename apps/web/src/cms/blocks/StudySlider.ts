import { type Block } from 'payload/types'

import { backgroundColor } from '../fields/backgroundColor'

export const StudySlider: Block = {
	slug: 'study-slider',
	labels: {
		singular: 'Study Slider',
		plural: 'Study Sliders',
	},
	fields: [
		backgroundColor(),
		{
			name: 'studies',
			type: 'relationship',
			relationTo: 'studies',
			hasMany: true,
			required: true,
		},
	],
}
