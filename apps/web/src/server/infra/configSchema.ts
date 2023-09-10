import { Type } from '@sinclair/typebox'
import { SiteEnvSchema } from '~/app/modules/globals/siteEnv.server'
import { NODE_ENV, APP_ENV, PORT, SERVER_URL } from '~/shared/schemas'

import { overloadProtectionEnvSchema } from '../middleware/overloadProtection'
import { cloudRunLoggerOptsEnvSchema } from './logger/cloudRunLoggerOpts'
import { payloadEnvSchema } from './payload'
import { redisEnvSchema } from './redis'
import { remixEnvSchema } from './remix'

/*
 *TYPEBOX ENV SCHEMAS
 *Object version (No Type.Object()) allows us to extend the env for other usage outside of serving requests like scripts
 *Import this if you want to add other env variables
 */
export const baseTypeboxEnvSchema = {
	...cloudRunLoggerOptsEnvSchema,
	...remixEnvSchema,
	...overloadProtectionEnvSchema,
	...payloadEnvSchema,
	...SiteEnvSchema,
	...redisEnvSchema,
	NODE_ENV,
	APP_ENV,
	PORT,
	PAYLOAD_PUBLIC_SERVER_URL: SERVER_URL,
}

/*
 *This is the default env schema for normal usage
 */
export const typeboxEnvSchema = Type.Object(baseTypeboxEnvSchema, {
	$id: 'envSchema',
})
