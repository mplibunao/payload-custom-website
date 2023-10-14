import path from 'path'
import generateBase64 from 'payload-base64-plugin'
import { buildConfig } from 'payload/config.js'

import { Logo } from './app/components/Icon/Logo'
import { collections } from './cms/collections'
import { globals } from './cms/globals'

import './app/styles/tailwindAdmin.css'

import { BackButton } from './cms/components/BackButton'
import { PAYLOAD_ADMIN_EMAIL, PAYLOAD_ADMIN_PASSWORD } from './constants'

const mockModulePath = path.resolve(__dirname, 'tests/mocks/emptyModuleMock.js')

// By default, Payload will boot up normally
// and you will be provided with a base `User` collection.
// But, here is where you define how you'd like Payload to work!
export default buildConfig({
	serverURL: process.env.PUBLIC_SERVER_URL,
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
			beforeNavLinks: [BackButton],
			graphics: {
				Icon: Logo,
				Logo,
			},
		},
		css: path.resolve(__dirname, 'cms/payload.css'),
		meta: {
			favicon: '/favicon.ico',
			titleSuffix: `| ${process.env.PAYLOAD_PUBLIC_SITE_TITLE as string}`,
		},
		autoLogin:
			process.env.PAYLOAD_PUBLIC_ENABLE_AUTOLOGIN === 'true'
				? {
						email: PAYLOAD_ADMIN_EMAIL,
						password: PAYLOAD_ADMIN_PASSWORD,
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
						test: /\tailwindAdmin.css$/i,
						use: ['css-loader', 'postcss-loader'],
					},
				],
			},
		}),
	},
	plugins: [generateBase64()],
})
