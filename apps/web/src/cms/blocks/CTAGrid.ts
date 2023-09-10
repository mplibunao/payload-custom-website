import { type Block } from 'payload/types'

import { link } from '../fields/link'

export const CTAGrid: Block = {
	slug: 'cta-grid',
	labels: {
		singular: 'CTA Grid',
		plural: 'CTA Grids',
	},
	interfaceName: 'CTAGridBlockType',
	fields: [
		{
			name: 'actions',
			label: 'Actions',
			type: 'array',
			required: true,
			minRows: 1,
			fields: [
				{
					name: 'headline',
					label: 'Headline',
					type: 'text',
					required: true,
				},
				{
					name: 'icon',
					label: 'Icon',
					type: 'radio',
					defaultValue: 'arrow',
					options: [
						{
							label: 'None',
							value: 'none',
						},
						{
							label: 'Arrow',
							value: 'arrow',
						},
					],
				},
				link(),
			],
		},
	],
}
