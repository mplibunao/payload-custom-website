import type { Block } from 'payload/types'

import { colorField } from '../fields/ColorPicker/colorPickerField'
import { linkGroup } from '../fields/linkGroup'
import { richText } from '../fields/richText'

export const CallToAction: Block = {
	slug: 'cta',
	interfaceName: 'CTA',
	labels: {
		singular: 'Call to Action',
		plural: 'Calls to Action',
	},
	fields: [
		colorField({ name: 'backgroundColor', label: 'Background Color' }),
		richText({ name: 'content', label: 'Content' }),
		linkGroup({
			appearances: false,
			overrides: {
				name: 'actions',
				labels: {
					plural: 'Actions',
					singular: 'Action',
				},
				minRows: 1,
				maxRows: 2,
			},
		}),
	],
}
