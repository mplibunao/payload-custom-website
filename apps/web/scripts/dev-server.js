import { execa } from 'execa'

const command =
	'tsx watch --clear-screen=false --ignore "app/**" --ignore "build/**" --ignore "node_modules/**" --inspect ./src/server/index.ts'
await execa(command, {
	stdio: ['ignore', 'inherit', 'inherit'],
	shell: true,
	env: {
		...process.env,
	},
	// https://github.com/sindresorhus/execa/issues/433
	windowsHide: false,
})
