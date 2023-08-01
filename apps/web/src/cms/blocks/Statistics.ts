import { type Block } from 'payload/types'

import { stat } from '../fields/stat'

export const Statistics: Block = {
	slug: 'statistics',
	labels: {
		singular: 'Statistics',
		plural: 'Statistic Blocks',
	},
	fields: [
		{
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
		},
		{
			name: 'stats',
			label: 'Statistics',
			type: 'array',
			minRows: 1,
			maxRows: 3,
			fields: [stat],
		},
	],
}
