import { type GlobalConfig } from 'payload/types'

import { link } from '../fields/link'

export const Footer: GlobalConfig = {
	slug: 'footer',
	label: 'Footer',
	fields: [
		{
			name: 'nav',
			label: 'Navigation',
			type: 'array',
			labels: {
				singular: 'Link',
				plural: 'Links',
			},
			fields: [link()],
		},
	],
}
