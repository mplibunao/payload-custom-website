import Ajv from 'ajv'
import standaloneCode from 'ajv/dist/standalone'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { typeboxEnvSchema } from '~/server/infra/configSchema'

const separator = {
	keyword: 'separator',
	type: 'string',
	metaSchema: {
		type: 'string',
		description: 'value separator',
	},
	modifying: true,
	valid: true,
	errors: false,
	compile:
		// @ts-expect-error


			(schema) =>
			// @ts-expect-error
			(data, { parentData: pData, parentDataProperty: pDataProperty }) => {
				// eslint-disable-next-line
				pData[pDataProperty] = data === '' ? [] : data.split(schema)
			},
}

const main = async () => {
	const ajv = new Ajv({
		allErrors: true,
		removeAdditional: true,
		useDefaults: true,
		coerceTypes: true,
		allowUnionTypes: true,
		addUsedSchema: false,
		// @ts-expect-error
		keywords: [separator],
		schemas: [typeboxEnvSchema],
		code: { source: true },
	})
	const moduleCode = standaloneCode(ajv)

	await writeFile(
		path.join(__dirname, '../src/shared/validation/compiledAjv.js'),
		`// @ts-nocheck\n${moduleCode}`,
	)
}

void main()
