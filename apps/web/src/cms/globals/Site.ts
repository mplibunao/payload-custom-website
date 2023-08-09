import { type GlobalConfig } from 'payload/types'

import { blockFields } from '../fields/blockFields'
import { ogImage } from '../fields/meta/ogImage'

export const Site: GlobalConfig = {
	slug: 'site',
	label: 'Site Config',
	fields: [
		blockFields({
			name: 'meta',
			fields: [
				{
					name: 'title',
					label: 'Title',
					type: 'text',
					required: true,
					admin: {
						description: 'Page title',
					},
				},
				{
					name: 'description',
					label: 'Description',
					type: 'textarea',
					required: true,
				},
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
