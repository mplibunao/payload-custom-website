import { Type } from '@sinclair/typebox'

export interface SiteEnv {
	site: { title: string; description: string }
}

export const SiteEnvSchema = {
	PAYLOAD_PUBLIC_SITE_TITLE: Type.String(),
	PAYLOAD_PUBLIC_SITE_DESCRIPTION: Type.String(),
}
