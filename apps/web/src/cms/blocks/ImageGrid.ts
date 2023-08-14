import { type Block } from 'payload/types'

import { colorField } from '../fields/ColorPicker/colorPickerField'

export const ImageGrid: Block = {
	slug: 'image-grid',
	labels: {
		singular: 'Image Grid',
		plural: 'Image Grids',
	},
	fields: [
		colorField({ name: 'backgroundColor', label: 'Background Color' }),
		{
			name: 'content',
			label: 'Content',
			type: 'richText',
		},
		{
			name: 'images',
			label: 'Images',
			type: 'array',
			minRows: 3,
			maxRows: 12,
			fields: [
				{
					type: 'upload',
					name: 'image',
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
