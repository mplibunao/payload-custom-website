import { type SelectField, type Field } from 'payload/types'

import { deepMerge } from '../utils/deepMerge'

export type Colors =
	| 'orange'
	| 'red'
	| 'none'
	| 'blue'
	| 'yellow'
	| 'gray'
	| 'black'

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
				{
					label: 'Yellow',
					value: 'yellow',
				},
				{
					label: 'Gray',
					value: 'gray',
				},
				{
					label: 'Black',
					value: 'black',
				},
			],
		},
		overrides,
	)
