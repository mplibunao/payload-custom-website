import path from 'path'
import { buildConfig } from 'payload/config.js'

import { Logo } from './app/components/Icon/Logo'
import { collections } from './cms/collections'
import { globals } from './cms/globals'

import './app/styles/payloadTailwind.css'

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
		components: {
			graphics: {
				Icon: Logo,
				Logo,
			},
		},
		meta: {
			favicon: '/favicon.ico',
			titleSuffix: `| ${process.env.SITE_TITLE as string}`,
		},
		autoLogin:
			process.env.PAYLOAD_ENABLE_AUTOLOGIN === 'true'
				? {
						email: 'admin@example.com',
						password: 'admin',
				  }
				: false,
		webpack: (config) => ({
			...config,
			resolve: {
				...config.resolve,
				alias: {
					...config.resolve?.alias,
					express: mockModulePath,
					'~': path.resolve(__dirname),
					react: path.join(__dirname, '../node_modules/react'),
					'react-dom': path.join(__dirname, '../node_modules/react-dom'),
				},
			},
			module: {
				...config.module,
				rules: [
					...(config.module?.rules ?? []),
					{
						test: /\tailwind.css$/i,
						use: ['css-loader', 'postcss-loader'],
					},
				],
			},
		}),
	},
})
