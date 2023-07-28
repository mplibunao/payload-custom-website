import { type CollectionConfig } from 'payload/dist/collections/config/types'

const FormSubmission: CollectionConfig = {
	slug: 'form-submissions',
	fields: [
		{ type: 'text', name: 'from', label: 'From Email' },
		{ type: 'textarea', name: 'message', label: 'Message' },
	],
}

export default FormSubmission
