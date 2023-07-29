import { buildConfig } from 'payload/config'

import { config } from '../config'
import { basePayloadConfig } from './baseConfig'

// By default, Payload will boot up normally
// and you will be provided with a base `User` collection.
// But, here is where you define how you'd like Payload to work!
export default buildConfig({
	...basePayloadConfig,
	express: {
		preMiddleware: [config.overloadProtection],
	},
})
