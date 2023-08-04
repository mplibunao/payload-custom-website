import { type FieldHook } from 'payload/types'

export function slugify(str: string) {
	str = str.replace(/^\s+|\s+$/g, '') // trim leading/trailing white space
	str = str.toLowerCase() // convert string to lowercase
	str = str
		.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
		.replace(/\s+/g, '-') // replace spaces with hyphens
		.replace(/-+/g, '-') // remove consecutive hyphens
	return str
}

export const formatSlug =
	(fallback: string): FieldHook =>
	({ operation, value, originalDoc, data }) => {
		if (typeof value === 'string') {
			return slugify(value)
		}

		if (operation === 'create') {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			const fallbackData = data?.[fallback] || originalDoc?.[fallback]

			if (fallbackData && typeof fallbackData === 'string') {
				return slugify(fallbackData)
			}
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return value
	}
