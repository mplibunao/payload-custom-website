import { type GlobalConfig } from 'payload/types'
import { FOOTER_KEY } from '~/constants/globalsCacheKeys'

import { navField } from '../fields/nav'

export const Footer: GlobalConfig = {
	slug: 'footer',
	label: 'Footer',
	hooks: {
		afterChange: [
			async ({ req, doc }) => {
				await req.app.locals.cacheService.update(doc, [FOOTER_KEY])
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				return doc
			},
		],
	},
	fields: [navField],
}
