import type { CollectionConfig } from 'payload/types'

import { metaField } from '../fields/meta'
import { slugField } from '../fields/slug'

export const Pages: CollectionConfig = {
	slug: 'pages',
	admin: {
		useAsTitle: 'title',
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'title',
			label: 'Title',
			type: 'text',
			required: true,
		},
		{
			name: 'richText',
			type: 'richText',
			label: 'Content',
		},
		slugField(),
		metaField,
	],
}
