import { type Block } from 'payload/types'

import { colorField } from '../fields/ColorPicker/colorPickerField'
import { link } from '../fields/link'

export const ImageContentCollage: Block = {
	slug: 'image-content-collage',
	labels: {
		singular: 'Image Content Collage',
		plural: 'Image Content Collages',
	},
	fields: [
		colorField({ name: 'backgroundColor', label: 'Background Color' }),
		{
			name: 'content',
			type: 'richText',
			label: 'Content',
			required: true,
		},
		{
			name: 'enableCTA',
			label: 'Enable Call to Action',
			type: 'checkbox',
		},
		{
			...link(),
			admin: {
				condition: (_, siblingData) => siblingData.enableCTA as boolean,
			},
		},
		{
			name: 'images',
			label: 'Images',
			type: 'array',
			minRows: 3,
			maxRows: 6,
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
