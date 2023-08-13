import path from 'path'
import { buildConfig } from 'payload/config.js'

import { collections } from './cms/collections'
import { globals } from './cms/globals'

const mockModulePath = path.resolve(__dirname, 'tests/mocks/emptyModuleMock.js')

// By default, Payload will boot up normally
// and you will be provided with a base `User` collection.
// But, here is where you define how you'd like Payload to work!
export default buildConfig({
	serverURL: process.env.SERVER_URL,
	collections,
	globals,
	typescript: {
		outputFile: path.resolve(__dirname, 'cms/payload-types.ts'),
	},
	graphQL: {
		schemaOutputFile: path.resolve(__dirname, 'cms/generated-schema.graphql'),
		disable: true,
	},
	telemetry: false,
	admin: {
		webpack: (config) => ({
			...config,
			resolve: {
				...config.resolve,
				alias: {
					...config.resolve?.alias,
					express: mockModulePath,
					'~': path.resolve(__dirname),
					os: mockModulePath,
					fs: mockModulePath,
					url: mockModulePath,
				},
			},
		}),
	},
})
