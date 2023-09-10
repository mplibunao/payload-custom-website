import { type GlobalConfig } from 'payload/types'

import { blockFields } from '../fields/blockFields'
import { baseMetaField } from '../fields/meta/base'
import { ogImage } from '../fields/meta/ogImage'

export const Site: GlobalConfig = {
	slug: 'site',
	label: 'Site Config',
	access: {
		read: () => true,
	},
	hooks: {
		afterChange: [
			async ({ req, doc }) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				if (req.payload.local) return doc

				await req.app.locals.siteService.invalidate()
				await req.app.locals.siteService.getSiteInfo()
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				return doc
			},
		],
	},
	fields: [
		blockFields({
			name: 'meta',
			fields: [
				...baseMetaField({ required: true }),
				{
					name: 'twitter',
					label: 'Twitter handle',
					type: 'text',
					hooks: {
						beforeValidate: [
							({ value }) => {
								if (typeof value === 'string' && !value.startsWith('@')) {
									return `@${value}`
								}

								// eslint-disable-next-line @typescript-eslint/no-unsafe-return
								return value
							},
						],
					},
				},
				ogImage({ required: true }),
			],
		}),
	],
}
