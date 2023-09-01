import { type Block } from 'payload/types'

import { colorField } from '../fields/ColorPicker/colorPickerField'
import { richText } from '../fields/richText'

export const MediaGrid: Block = {
	slug: 'media-grid',
	labels: {
		singular: 'Media Grid',
		plural: 'Media Grids',
	},
	fields: [
		colorField({ name: 'backgroundColor', label: 'Background Color' }),
		richText({ name: 'content', label: 'Content', required: false }),
		{
			name: 'media',
			label: 'Media',
			type: 'array',
			minRows: 3,
			maxRows: 12,
			fields: [
				{
					type: 'upload',
					name: 'media',
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
