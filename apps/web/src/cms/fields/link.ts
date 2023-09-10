import { type Field, type GroupField } from 'payload/dist/fields/config/types'

import { deepMerge } from '../utils/deepMerge'

export const appearanceOptions = {
	primary: {
		label: 'Primary Button',
		value: 'primary',
	},
	secondary: {
		label: 'Secondary Button',
		value: 'secondary',
	},
	default: {
		label: 'Default',
		value: 'default',
	},
}

export type LinkAppearances = 'primary' | 'secondary' | 'default'

type LinkType = (options?: {
	appearances?: LinkAppearances[] | false
	disableLabel?: boolean
	overrides?: Partial<GroupField>
}) => Field

export const link: LinkType = ({
	appearances,
	disableLabel = false,
	overrides = {},
} = {}) => {
	const linkResult: Field = {
		name: 'link',
		type: 'group',
		admin: {
			hideGutter: true,
			...(overrides?.admin || {}),
		},
		interfaceName: 'PageLink',
		fields: [
			{
				type: 'row',
				fields: [
					{
						name: 'type',
						type: 'radio',
						options: [
							{
								label: 'Internal link',
								value: 'reference',
							},
							{
								label: 'Custom URL',
								value: 'custom',
							},
						],
						defaultValue: 'reference',
						admin: {
							layout: 'horizontal',
							width: '50%',
						},
					},
					{
						name: 'newTab',
						label: 'Open in new tab',
						type: 'checkbox',
						admin: {
							width: '50%',
							style: {
								alignSelf: 'flex-end',
							},
						},
					},
				],
			},
		],
	}

	const linkTypes: Field[] = [
		{
			name: 'reference',
			label: 'Page or Document to link to',
			type: 'relationship',
			// add other types of reference links here. Eg. posts, case-studies, etc
			relationTo: ['pages'],
			maxDepth: 1,
			admin: {
				condition: (_, siblingData) => siblingData?.type === 'reference',
				width: disableLabel ? undefined : '50%',
			},
		},
		{
			name: 'url',
			label: 'Custom URL',
			type: 'text',
			required: true,
			admin: {
				condition: (_, siblingData) => siblingData?.type === 'custom',
				width: disableLabel ? undefined : '50%',
			},
		},
	]

	if (!disableLabel) {
		linkResult.fields.push({
			type: 'row',
			fields: [
				...linkTypes,
				{
					name: 'label',
					label: 'Label',
					type: 'text',
					required: true,
					admin: {
						width: '50%',
					},
				},
			],
		})
	} else {
		linkResult.fields.concat(linkTypes)
	}

	if (appearances !== false) {
		const appearanceOptionsToUse = appearances
			? appearances.map((appearance) => appearanceOptions[appearance])
			: [
					appearanceOptions.default,
					appearanceOptions.primary,
					appearanceOptions.secondary,
			  ]

		linkResult.fields.push({
			name: 'appearance',
			type: 'select',
			defaultValue: 'default',
			options: appearanceOptionsToUse,
			admin: {
				description: 'Choose how the link should be rendered.',
			},
		})
	}

	return deepMerge(linkResult, overrides)
}
