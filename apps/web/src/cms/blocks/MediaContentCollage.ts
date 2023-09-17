import { type Block } from 'payload/types'

import { colorField } from '../fields/ColorPicker/colorPickerField'
import { link } from '../fields/link'
import { richText } from '../fields/richText'

export const MediaContentCollage: Block = {
	slug: 'media-content-collage',
	interfaceName: 'MediaContentCollageBlockType',
	labels: {
		singular: 'Media Content Collage',
		plural: 'Media Content Collages',
	},
	fields: [
		colorField({ name: 'backgroundColor', label: 'Background Color' }),
		richText({ name: 'content', label: 'Content' }),
		{
			name: 'enableCTA',
			label: 'Enable Call to Action',
			type: 'checkbox',
			defaultValue: false,
			required: true,
		},
		{
			...link(),
			admin: {
				condition: (_, siblingData) => siblingData.enableCTA as boolean,
			},
		},
		{
			name: 'media',
			label: 'Media',
			type: 'array',
			minRows: 3,
			maxRows: 6,
			required: true,
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
