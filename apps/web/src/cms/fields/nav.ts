import { type Field } from 'payload/types'

import { link } from './link'

export const navField: Field = {
	name: 'nav',
	label: 'Navigation',
	type: 'array',
	interfaceName: 'Nav',
	labels: {
		singular: 'Link',
		plural: 'Links',
	},
	fields: [link()],
}
