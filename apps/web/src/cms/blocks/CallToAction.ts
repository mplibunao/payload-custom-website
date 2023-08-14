import type { Block } from 'payload/types'

import { colorField } from '../fields/ColorPicker/colorPickerField'
import { blockFields } from '../fields/blockFields'
import { linkGroup } from '../fields/linkGroup'

export const CallToAction: Block = {
	slug: 'cta',
	labels: {
		singular: 'Call to Action',
		plural: 'Calls to Action',
	},
	fields: [
		blockFields({
			name: 'ctaFields',
			fields: [
				colorField({ name: 'backgroundColor', label: 'Background Color' }),
				{
					name: 'content',
					type: 'richText',
					label: 'Content',
					required: true,
				},
				{
					name: 'feature',
					type: 'select',
					defaultValue: 'none',
					required: true,
					options: [
						{
							label: 'None',
							value: 'none',
						},
						{
							label: 'Create Payload App',
							value: 'cpa',
						},
					],
				},
				linkGroup({
					appearances: false,
				}),
			],
		}),
	],
}
