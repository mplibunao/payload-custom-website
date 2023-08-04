import { type Field, type ArrayField } from 'payload/dist/fields/config/types'

import { deepMerge } from '../utils/deepMerge'
import { link, type LinkAppearances } from './link'

type LinkGroupType = (options?: {
	overrides?: Partial<ArrayField>
	appearances?: LinkAppearances[] | false
}) => Field

export const linkGroup: LinkGroupType = ({
	overrides = {},
	appearances,
} = {}) => {
	const generatedLinkGroup: Field = {
		name: 'links',
		type: 'array',
		fields: [
			link({
				appearances,
			}),
		],
	}

	return deepMerge(generatedLinkGroup, overrides)
}
