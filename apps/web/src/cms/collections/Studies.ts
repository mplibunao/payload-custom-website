import { type CollectionConfig } from 'payload/dist/collections/config/types'

import { metaField } from '../fields/meta'
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
		{
			name: 'featuredImage',
			label: 'Featured Image',
			type: 'upload',
			relationTo: 'media',
			required: true,
		},
		{
			name: 'client',
			label: 'Client',
			type: 'text',
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'location',
			label: 'Location',
			type: 'text',
			admin: { position: 'sidebar' },
		},
		{
			name: 'categories',
			label: 'Categories',
			type: 'relationship',
			relationTo: 'categories',
			hasMany: true,
			admin: {
				position: 'sidebar',
			},
		},
		slugField(),
		metaField,
	],
}
