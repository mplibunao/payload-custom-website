import { type Field } from 'payload/types'

type Props = {
	required?: boolean
}
export const ogImage = ({ required }: Props = {}): Field => ({
	name: 'ogImage',
	label: 'Open Graph Image',
	type: 'upload',
	relationTo: 'media',
	required,
})
