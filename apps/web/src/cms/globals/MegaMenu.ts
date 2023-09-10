import { type GlobalConfig } from 'payload/types'
import { MEGA_MENU_KEY } from '~/constants/globalsCacheKeys'

import { navField } from '../fields/nav'

export const MegaMenu: GlobalConfig = {
	slug: 'mega-menu',
	label: 'Mega Menu',
	access: {
		read: () => true,
	},
	hooks: {
		afterChange: [
			async ({ req, doc }) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				if (req.payload.local) return doc

				await req.app.locals.cacheService.update(doc, [MEGA_MENU_KEY])
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				return doc
			},
		],
	},
	fields: [navField],
}
