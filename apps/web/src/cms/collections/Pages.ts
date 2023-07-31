import type { CollectionConfig } from 'payload/types'

import { Content } from '../blocks/Content'
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
			name: 'layout',
			label: 'Page Layout',
			type: 'blocks',
			minRows: 1,
			blocks: [Content],
		},
		slugField(),
		metaField,
	],
}
