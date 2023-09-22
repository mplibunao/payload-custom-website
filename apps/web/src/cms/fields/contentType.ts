import { type Field } from 'payload/types'

export const contentType: Field = {
	name: 'contentType',
	label: 'Content Type',
	type: 'select',
	required: true,
	defaultValue: 'static',
	admin: {
		position: 'sidebar',
		description:
			"Choose dynamic for time-sensitive data like a product's inventory count to display accurate data. Choose static if you want better performance in exchange for data freshness",
	},
	options: [
		{ label: 'Static', value: 'static' },
		{ label: 'Dynamic', value: 'dynamic' },
	],
}
