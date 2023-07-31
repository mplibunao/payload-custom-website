import { type CollectionConfig } from 'payload/dist/collections/config/types'

import { slugField } from '../fields/slug'

export const Studies: CollectionConfig = {
	slug: 'studies',
	fields: [
		{
			name: 'title',
			label: 'Title',
			type: 'text',
			required: true,
		},
		slugField(),
	],
}
