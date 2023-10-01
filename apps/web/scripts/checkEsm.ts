import chalk from 'chalk'
import { $ } from 'execa'
import fs from 'node:fs'

import { type PackageJson } from './build.ts'

void main()

async function main() {
	const packageJson = JSON.parse(
		fs.readFileSync('./package.json', 'utf-8'),
	) as PackageJson

	try {
		const deps = [...Object.keys(packageJson.dependencies)]

		const isEsmResult = await Promise.all(
			deps.map(async (dep) => {
				console.log(chalk.green(`running npx is-esm ${dep}`))
				const { stdout: output } = await $`npx is-esm ${dep}`

				const regex = /(Yes|No)$/
				const match = regex.exec(output as unknown as string)
				if (!match) throw new Error('Unexpected output from is-esm')

				const isEsm = match[1] === 'Yes'
				if (isEsm) {
					console.log(chalk.green(`${dep} is an esm package`))
				} else {
					console.error(chalk.red(`${dep} is not an esm package`))
				}
				return { dep, isEsm, output }
			}),
		)

		const esmDeps = isEsmResult
			.filter((result) => result.isEsm)
			.map((result) => result.dep)

		const nonEsmDeps = isEsmResult
			.filter((result) => !result.isEsm)
			.map((result) => result.dep)

		console.log("here's the list of esm packages in your package.json")
		console.info(esmDeps)
		console.log("here's the list of non-esm packages in your package.json")
		console.info(nonEsmDeps)

		process.exit(0)
	} catch (e) {
		console.error(e, 'error')
		process.exit(1)
	}
}
