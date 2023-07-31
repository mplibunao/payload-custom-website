import { type GroupField, type Field } from 'payload/dist/fields/config/types'

import { deepMerge } from '../utils/deepMerge'

interface Args {
	name: string
	fields: Field[]
	overrides?: Partial<GroupField>
}

export const blockFields = ({ name, fields, overrides }: Args): Field =>
	deepMerge(
		{
			name,
			label: false,
			type: 'group',
			admin: {
				hideGutter: true,
				style: {
					margin: 0,
					padding: 0,
				},
			},
			fields,
		},
		overrides,
	)
