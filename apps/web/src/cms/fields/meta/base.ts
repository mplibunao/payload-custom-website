import { type Field } from 'payload/types'

type Props = {
	required?: boolean
}
export const baseMetaField = ({ required }: Props = {}): Field[] => [
	{
		name: 'title',
		label: 'Title',
		type: 'text',
		required: true,
		admin: {
			description: 'Page title',
		},
	},
	{
		name: 'description',
		label: 'Description',
		type: 'textarea',
		required,
	},
]
