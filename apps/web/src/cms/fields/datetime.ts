import { type FieldBase } from 'payload/dist/fields/config/types'
import { type Field } from 'payload/types'

import { deepMerge } from '../utils/deepMerge'

interface Args {
	name: string
	label: FieldBase['label']
	overrides?: Partial<Field>
}

export const dateTimeField = ({ name, label, overrides }: Args): Field =>
	deepMerge(
		{
			name,
			label,
			type: 'date',
			admin: {
				date: {
					pickerAppearance: 'dayAndTime',
				},
			},
		},
		overrides,
	)
