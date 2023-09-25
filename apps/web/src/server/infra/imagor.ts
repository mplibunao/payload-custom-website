import { Type } from '@sinclair/typebox'

export const imagorEnvSchema = {
	IMAGOR_URL: Type.String({ default: 'http://localhost:8000' }),
	IMAGOR_SECRET: Type.String(),
}
