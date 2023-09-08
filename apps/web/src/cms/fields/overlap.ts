import { type Field } from 'payload/types'

export const overlap: Field = {
	type: 'row',
	fields: [
		{
			name: 'topOverlap',
			label: 'Top Overlap',
			type: 'select',
			defaultValue: 'none',
			options: [
				{
					label: 'None',
					value: 'none',
				},
				{
					label: 'Small',
					value: 'small',
				},
				{
					label: 'Medium',
					value: 'medium',
				},
				{
					label: 'Large',
					value: 'large',
				},
			],
			admin: {
				width: '50%',
			},
		},
		{
			name: 'bottomOverlap',
			label: 'Bottom Overlap',
			type: 'select',
			defaultValue: 'none',
			options: [
				{
					label: 'None',
					value: 'none',
				},
				{
					label: 'Small',
					value: 'small',
				},
				{
					label: 'Medium',
					value: 'medium',
				},
				{
					label: 'Large',
					value: 'large',
				},
			],
			admin: {
				width: '50%',
			},
		},
	],
}
