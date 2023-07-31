import { type FieldHook } from 'payload/types'

const format = (val: string): string =>
	val
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '')
		.toLowerCase()

export const formatSlug =
	(fallback: string): FieldHook =>
	({ operation, value, originalDoc, data }) => {
		if (typeof value === 'string') {
			return format(value)
		}

		if (operation === 'create') {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const fallbackData = data?.[fallback] || originalDoc?.[fallback]

			if (fallbackData && typeof fallbackData === 'string') {
				return format(fallbackData)
			}
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return value
	}
