import { type Field } from 'payload/types'

import { blockFields } from '../blockFields'
import { ColorPickerInput, validateColor } from './ColorPickerInput'

type Args = {
	name?: string
	label?: string
}

export const colorField = ({
	name = 'color',
	label = 'Color',
}: Args = {}): Field => {
	return blockFields({
		overrides: { label },
		name,
		fields: [
			{
				name,
				type: 'select',
				required: true,
				defaultValue: 'none',
				admin: {
					components: {
						// hide this field in the admin ui
						Field: () => null,
					},
				},
				hooks: {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-return
					beforeChange: [({ siblingData }) => siblingData.colorPicker],
				},
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
			{
				name: 'colorPicker',
				type: 'text',
				label: false,
				validate: validateColor,
				required: true,
				admin: {
					components: {
						Field: ColorPickerInput,
					},
				},
			},
		],
	})
}