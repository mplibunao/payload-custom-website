import { type GlobalConfig } from 'payload/types'

import { blockFields } from '../fields/blockFields'
import { baseMetaField } from '../fields/meta/base'
import { ogImage } from '../fields/meta/ogImage'

export const Site: GlobalConfig = {
	slug: 'site',
	label: 'Site Config',
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
		{
			name: 'logo',
			label: 'Logo',
			type: 'upload',
			relationTo: 'logo',
			required: true,
			admin: {
				description: 'Requires svg format',
			},
		},
	],
}
