import { type GlobalConfig } from 'payload/types'
import { FOOTER_KEY } from '~/app/modules/globals/globals.service.server'

import { navField } from '../fields/nav'

export const Footer: GlobalConfig = {
	slug: 'footer',
	label: 'Footer',
	access: {
		read: () => true,
	},
	hooks: {
		afterChange: [
			async ({ req, doc }) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				if (req.payload.local) return doc

				await req.app.locals.cacheService.update(doc, [FOOTER_KEY])
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				return doc
			},
		],
	},
	fields: [navField],
}
