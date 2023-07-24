import path from 'path'
import { buildConfig } from 'payload/config.js'
import { getDirname } from '~/shared/esm.ts'

// By default, Payload will boot up normally
// and you will be provided with a base `User` collection.
// But, here is where you define how you'd like Payload to work!
export default buildConfig({
	serverURL: 'http://localhost:3000',
	typescript: {
		outputFile: path.resolve(
			getDirname(import.meta.url),
			'src/cms/payload-types.ts',
		),
	},
	graphQL: {
		schemaOutputFile: path.resolve(
			getDirname(import.meta.url),
			'src/cms/generated-schema.graphql',
		),
	},
})
