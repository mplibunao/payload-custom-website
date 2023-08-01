import { type SelectField, type Field } from 'payload/types'

import { deepMerge } from '../utils/deepMerge'

export type Type = 'orange' | 'red' | 'none' | 'blue'

type Args = {
	overrides?: Partial<SelectField>
}

export const backgroundColor = ({ overrides = {} }: Args = {}): Field =>
	deepMerge(
		{
			name: 'backgroundColor',
			type: 'select',
			defaultValue: 'none',
			options: [
				{
					label: 'None',
					value: 'none',
				},
				{
					label: 'Red',
					value: 'red',
				},
				{
					label: 'Blue',
					value: 'blue',
				},
				{
					label: 'Orange',
					value: 'orange',
				},
			],
		},
		overrides,
	)
