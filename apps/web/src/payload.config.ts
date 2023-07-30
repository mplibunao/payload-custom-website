import path from 'path'
import { buildConfig } from 'payload/config.js'

import FormSubmission from './cms/collections/FormSubmission'

// By default, Payload will boot up normally
// and you will be provided with a base `User` collection.
// But, here is where you define how you'd like Payload to work!
export default buildConfig({
	serverURL: 'http://localhost:3000',
	collections: [FormSubmission],
	typescript: {
		outputFile: path.resolve(path.resolve(__dirname), 'cms/payload-types'),
	},
	graphQL: {
		schemaOutputFile: path.resolve(
			path.resolve(__dirname),
			'cms/generated-schema.graphql',
		),
	},
	telemetry: false,
})
