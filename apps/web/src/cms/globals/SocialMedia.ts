import { type GlobalConfig } from 'payload/types'
import { SOCIAL_MEDIA_KEY } from '~/constants/globalsCacheKeys'

export const SocialMedia: GlobalConfig = {
	slug: 'social-media',
	label: 'Social Media',
	access: {
		read: () => true,
	},
	hooks: {
		afterChange: [
			async ({ req, doc }) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				if (req.payload.local) return doc

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
