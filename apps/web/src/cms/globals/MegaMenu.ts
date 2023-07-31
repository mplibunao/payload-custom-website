import { type GlobalConfig } from 'payload/types'

import { link } from '../fields/link'

export const MegaMenu: GlobalConfig = {
	slug: 'mega-menu',
	label: 'Mega Menu',
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
