import { type Block } from 'payload/types'

import { colorField } from '../fields/ColorPicker/colorPickerField'
import { richText } from '../fields/richText'

export const Content: Block = {
	slug: 'content',
	labels: {
		singular: 'Content',
		plural: 'Content Blocks',
	},
	interfaceName: 'ContentBlockType',
	fields: [
		colorField({ name: 'backgroundColor', label: 'Background Color' }),
		{
			name: 'columns',
			type: 'array',
			minRows: 1,
			labels: {
				singular: 'Column',
				plural: 'Columns',
			},
			required: true,
			fields: [
				{
					type: 'row',
					fields: [
						{
							name: 'width',
							label: 'Column Width',
							type: 'select',
							defaultValue: 'full',
							required: true,
							options: [
								{
									label: 'One Third',
									value: 'oneThird',
								},
								{
									label: 'Half',
									value: 'half',
								},
								{
									label: 'Two Thirds',
									value: 'twoThirds',
								},
								{
									label: 'Full Width',
									value: 'full',
								},
							],
							admin: {
								width: '50%',
							},
						},
						{
							name: 'alignment',
							label: 'Alignment',
							type: 'select',
							defaultValue: 'left',
							required: true,
							options: [
								{
									label: 'Left',
									value: 'left',
								},
								{
									label: 'Center',
									value: 'center',
								},
								{
									label: 'Right',
									value: 'right',
								},
							],
							admin: {
								width: '50%',
							},
						},
					],
				},
				richText({ name: 'content', label: 'Content' }),
			],
		},
		{
			name: 'accentLine',
			label: 'Enable Accent Line',
			type: 'checkbox',
			defaultValue: false,
		},
		{
			name: 'accentLineAlignment',
			label: 'Accent Line Alignment',
			type: 'radio',
			defaultValue: 'left',
			options: [
				{
					label: 'Left',
					value: 'left',
				},
				{
					label: 'Right',
					value: 'right',
				},
			],
			admin: {
				condition: (_, siblingData) => siblingData.accentLine as boolean,
				layout: 'horizontal',
			},
		},
		{
			type: 'row',
			fields: [
				{
					name: 'paddingTop',
					label: 'Padding Top',
					type: 'select',
					required: true,
					defaultValue: 'medium',
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
					name: 'paddingBottom',
					label: 'Padding Bottom',
					type: 'select',
					required: true,
					defaultValue: 'medium',
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
	],
}
