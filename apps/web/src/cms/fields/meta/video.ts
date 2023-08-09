import { type Field } from 'payload/types'

import { dateTimeField } from '../datetime'
import { profileField } from './profile'
import { tagField } from './tag'

export const videoField: Field[] = [
	{
		name: 'actor',
		labels: {
			singular: 'Actor',
			plural: 'Actors',
		},
		type: 'array',
		fields: [
			{
				type: 'text',
				name: 'profile',
				label: 'Profile URL',
			},
			...profileField,
			{
				name: 'role',
				label: 'Role',
				type: 'text',
			},
		],
	},
	{
		name: 'director',
		labels: {
			singular: 'Director',
			plural: 'Directors',
		},
		type: 'array',
		fields: [
			{
				type: 'text',
				name: 'profile',
				label: 'Profile URL',
			},
			...profileField,
		],
	},
	{
		name: 'writer',
		labels: {
			singular: 'Writer',
			plural: 'Writers',
		},
		type: 'array',
		fields: [
			{
				type: 'text',
				name: 'profile',
				label: 'Profile URL',
			},
			...profileField,
		],
	},
	{
		name: 'duration',
		label: 'Duration',
		type: 'number',
		min: 1,
	},
	dateTimeField({
		name: 'releaseDate',
		label: 'Release Date',
	}),
	tagField,
]
