import { buildConfig } from 'payload/config'
import FormSubmission from '~/collections/FormSubmission'
import { config } from '~/infra/config'

// By default, Payload will boot up normally
// and you will be provided with a base `User` collection.
// But, here is where you define how you'd like Payload to work!
export default buildConfig({
	serverURL: 'http://localhost:3000',
	collections: [FormSubmission],
	typescript: {
		outputFile: './src/payload-types.ts',
	},
	graphQL: {
		schemaOutputFile: './src/generated-schema.graphql',
		disable: true,
	},
	telemetry: false,
	express: {
		preMiddleware: [config.overloadProtection],
	},
})
