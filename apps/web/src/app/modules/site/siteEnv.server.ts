import { z } from 'zod'

export type SiteEnv = {
	site: { title: string; description: string }
}

export const SiteEnvSchema = {
	PAYLOAD_PUBLIC_SITE_TITLE: z.string(),
	PAYLOAD_PUBLIC_SITE_DESCRIPTION: z.string(),
}
