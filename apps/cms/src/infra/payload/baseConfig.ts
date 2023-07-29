import path from 'node:path'
import { type Config } from 'payload/config'
import FormSubmission from '~/collections/FormSubmission'

export const basePayloadConfig: Config = {
	serverURL: 'http://localhost:4000',
	collections: [FormSubmission],
	typescript: {
		outputFile: path.resolve(__dirname, 'payload-types'),
	},
	graphQL: {
		schemaOutputFile: path.resolve(__dirname, 'payload-schema.graphql'),
		disable: true,
	},
	telemetry: false,
}
