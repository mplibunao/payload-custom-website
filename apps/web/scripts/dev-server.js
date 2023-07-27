import { execa } from 'execa'

const runServer = async () => {
	const command =
		'tsx watch --clear-screen=false --ignore "app/**" --ignore "build/**" --ignore "node_modules/**" --inspect ./src/server/index.ts'
	await execa(command, {
		stdio: ['ignore', 'inherit', 'inherit'],
		shell: true,
		env: {
			...process.env,
			REMIX_BUILD_PATH: '../../build/index.js',
		},
		// https://github.com/sindresorhus/execa/issues/433
		windowsHide: false,
	})
}

const buildServer = async () => {
	const command = 'tsx --inspect scripts/build.ts'
	const args = ['--app dev', '--watch']
	await execa(command, args, {
		stdio: ['inherit', 'inherit', 'inherit'],
		shell: true,
		env: {},
		// https://github.com/sindresorhus/execa/issues/433
		windowsHide: false,
	})
}

// need to use tsx watch even on js or else server will keep restarting even on hmr
const runBundledServer = async () => {
	const command =
		'tsx watch --clear-screen=false --ignore "app/**" --ignore "build/**" --ignore "node_modules/**" --inspect dist/index.js'
	await execa(command, {
		stdio: ['ignore', 'inherit', 'inherit'],
		shell: true,
		env: process.env,
		// https://github.com/sindresorhus/execa/issues/433
		windowsHide: false,
	})
}

// Get as close to production as possible
// Not sure but `Starting inspector on 127.0.0.1:9229 failed: address already in use` might be because we're running 2 commands. Don't notice anything wrong though
await Promise.all([buildServer(), runBundledServer()])

//await runServer()
