import { type Field } from 'payload/types'

export const profileField: Field[] = [
	{
		type: 'row',
		fields: [
			{
				name: 'firstName',
				label: 'First name',
				type: 'text',
				admin: { width: '50%' },
			},
			{
				name: 'lastName',
				label: 'Last name',
				type: 'text',
				admin: { width: '50%' },
			},
		],
	},
	{
		type: 'row',
		fields: [
			{
				name: 'username',
				label: 'Username',
				type: 'text',
				admin: { width: '50%' },
			},
			{
				name: 'gender',
				label: 'Gender',
				type: 'text',
				admin: { width: '50%' },
			},
		],
	},
]
