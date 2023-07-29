import path from 'node:path'
import { type Config, buildConfig } from 'payload/config'
import FormSubmission from '~/collections/FormSubmission'

import { config } from '../config'

export const baseConfig: Config = {
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
	express: {
		preMiddleware: [config.overloadProtection],
	},
}

// By default, Payload will boot up normally
// and you will be provided with a base `User` collection.
// But, here is where you define how you'd like Payload to work!
export default buildConfig(baseConfig)
