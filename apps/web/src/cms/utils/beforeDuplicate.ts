import { type BeforeDuplicate } from 'payload/types'

import { type Page } from '../payload-types'

export const beforeDuplicateSlug: BeforeDuplicate<Page> = ({ data }) => {
	return {
		...data,
		slug: `${data.slug} Copy${Math.floor(Math.random() * 10)}`,
	}
}
