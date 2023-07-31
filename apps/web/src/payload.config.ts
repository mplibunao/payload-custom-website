import path from 'path'
import { buildConfig } from 'payload/config.js'

import { collections } from './cms/collections'
import { globals } from './cms/globals'

// By default, Payload will boot up normally
// and you will be provided with a base `User` collection.
// But, here is where you define how you'd like Payload to work!
export default buildConfig({
	serverURL: 'http://localhost:3000',
	collections,
	globals,
	typescript: {
		outputFile: path.resolve(__dirname, 'cms/payload-types'),
	},
	graphQL: {
		schemaOutputFile: path.resolve(__dirname, 'cms/generated-schema.graphql'),
		disable: true,
	},
	telemetry: false,
})
