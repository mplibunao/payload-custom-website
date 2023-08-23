import { type GlobalConfig } from 'payload/types'
import { MEGA_MENU_KEY } from '~/constants/globalsCacheKeys'

import { link } from '../fields/link'

export const MegaMenu: GlobalConfig = {
	slug: 'mega-menu',
	label: 'Mega Menu',
	hooks: {
		afterChange: [
			async ({ req, doc }) => {
				await req.app.locals.cacheService.update(doc, [MEGA_MENU_KEY])
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				return doc
			},
		],
	},
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
