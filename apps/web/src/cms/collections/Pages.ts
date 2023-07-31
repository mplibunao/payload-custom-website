import type { CollectionConfig } from 'payload/types'

import { CallToAction } from '../blocks/CallToAction'
import { Content } from '../blocks/Content'
import { Spacer } from '../blocks/Spacer'
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
			blocks: [CallToAction, Content, Spacer],
		},
		slugField(),
		metaField,
	],
}
