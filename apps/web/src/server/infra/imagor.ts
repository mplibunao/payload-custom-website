import { Type } from '@sinclair/typebox'

export const imagorEnvSchema = {
	PAYLOAD_PUBLIC_IMAGOR_URL: Type.String({ default: 'http://localhost:8000' }),
}
