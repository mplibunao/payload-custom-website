import { Type } from '@sinclair/typebox'

export type SiteEnv = {
	site: { title: string; description: string }
}

export const SiteEnvSchema = {
	SITE_TITLE: Type.String(),
	SITE_DESCRIPTION: Type.String(),
}
