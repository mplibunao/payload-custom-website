import { type Field } from 'payload/types'

export const tagField: Field = {
	name: 'tag',
	label: 'Tags',
	type: 'array',
	fields: [
		{
			name: 'tag',
			label: 'Tag',
			type: 'text',
			required: true,
		},
	],
}
