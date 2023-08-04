import { type Field } from 'payload/types'

export const stat: Field = {
	type: 'row',
	fields: [
		{
			name: 'stat',
			label: 'Statistic',
			type: 'text',
			admin: {
				width: '50%',
			},
		},
		{
			name: 'description',
			label: 'Description',
			type: 'text',
			admin: {
				width: '50%',
			},
		},
	],
}
