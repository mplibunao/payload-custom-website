import { type GlobalConfig } from 'payload/types'
import { SOCIAL_MEDIA_KEY } from '~/constants/globalsCacheKeys'

export const SocialMedia: GlobalConfig = {
	slug: 'social-media',
	label: 'Social Media',
	hooks: {
		afterChange: [
			async ({ req, doc }) => {
				await req.app.locals.cacheService.update(doc, [SOCIAL_MEDIA_KEY])
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				return doc
			},
		],
	},
	fields: [
		{
			type: 'array',
			name: 'links',
			labels: {
				singular: 'Link',
				plural: 'Links',
			},
			fields: [
				{
					type: 'row',
					fields: [
						{
							name: 'label',
							label: 'Label',
							type: 'text',
							required: true,
							admin: {
								width: '50%',
							},
						},
						{
							name: 'url',
							label: 'URL',
							type: 'text',
							required: true,
							admin: {
								width: '50%',
							},
						},
					],
				},
			],
		},
	],
}
