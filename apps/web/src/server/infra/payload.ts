import { FormSubmission } from '@org/cms/lib/collections/FormSubmission'
import { join } from 'desm'
import { buildConfig, type SanitizedConfig } from 'payload/config'

const config: Promise<SanitizedConfig> = buildConfig({
	serverURL: 'http://localhost:4000',
	collections: [FormSubmission],
	typescript: {
		outputFile: join(import.meta.url, 'payload-types'),
	},
	graphQL: {
		schemaOutputFile: join(import.meta.url, 'payload-schema.graphql'),
		disable: true,
	},
	telemetry: false,
})

export default config
