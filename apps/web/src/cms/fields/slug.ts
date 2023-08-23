import { type Field } from 'payload/dist/fields/config/types'
import slugify from 'slugify'

import { deepMerge } from '../utils/deepMerge'

export const formatSlug = (field: string): string => {
	if (!field) return field
	return slugify(field, {
		lower: true,
	})
}

type Slug = (fallback?: string, overrides?: Partial<Field>) => Field

export const slugField: Slug = (fallback = 'title', overrides = {}) =>
	deepMerge<Field, Partial<Field>>(
		{
			name: 'slug',
			label: 'Slug',
			type: 'text',
			unique: true,
			index: true,
			required: true,
			defaultValue: fallback,
			admin: {
				position: 'sidebar',
				description:
					'Last part of the URL address that serves as a unique identifier of the page',
			},
			hooks: {
				beforeValidate: [
					({ operation, value, originalDoc, data }) => {
						if (typeof value === 'string') {
							return formatSlug(value)
						}

						if (['create', 'update'].includes(operation ?? '')) {
							// eslint-disable-next-line
							const fallbackData = data?.[fallback] || originalDoc?.[fallback]

							if (fallbackData && typeof fallbackData === 'string') {
								return formatSlug(fallbackData)
							}
						}

						// eslint-disable-next-line @typescript-eslint/no-unsafe-return
						return value
					},
				],
			},
		},
		overrides,
	)
