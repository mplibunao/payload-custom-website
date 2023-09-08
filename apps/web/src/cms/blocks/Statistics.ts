import { type Block } from 'payload/types'

import { colorField } from '../fields/ColorPicker/colorPickerField'
import { overlap } from '../fields/overlap'
import { stat } from '../fields/stat'

export const Statistics: Block = {
	slug: 'statistics',
	labels: {
		singular: 'Statistics',
		plural: 'Statistic Blocks',
	},
	fields: [
		colorField({ name: 'backgroundColor', label: 'Background Color' }),
		overlap,
		{
			name: 'stats',
			label: 'Statistics',
			type: 'array',
			minRows: 1,
			maxRows: 3,
			fields: [stat],
		},
	],
}
