import { type ServerBuild, broadcastDevReady } from '@remix-run/node'
import closeWithGrace, { type Signals } from 'close-with-grace'
import express from 'express'
import path from 'path'
import { getDirname } from '~/utils/esm.ts'

// @ts-ignore - this file may not exist if you haven't built yet, but it will
// definitely exist by the time the dev or prod server actually runs.
import * as remixBuild from '../../build/index.js'
import { config } from './infra/config.ts'
import { initApp } from './server.ts'

const build = remixBuild as unknown as ServerBuild
let devBuild = build

const app = express()
const appWithMiddlewares = await initApp(app, { config, devBuild, build })

const server = appWithMiddlewares.listen(config.server.port, () => {
	console.log(`✅ server started on ${config.server.port}`)
	if (config.env.NODE_ENV === 'development') {
		broadcastDevReady(build)
	}
})

// delay is the number of milliseconds for the graceful close to finish
// Fast reload for dev
const delay = config.env.APP_ENV === 'production' ? 5000 : 200
const closeListeners = closeWithGrace(
	{ delay },
	async ({
		err,
		signal,
		manual,
	}: {
		err?: Error
		signal?: Signals
		manual?: boolean
	}) => {
		if (err) {
			// TODO: Replace with payload's pino instance
			console.log(err)
		}

		// TODO: Replace with payload's pino instance
		console.log({ signal, manual }, 'closing application')

		await new Promise((resolve, reject) => {
			server.close((e) => {
				closeListeners.uninstall()
				return e ? reject(e) : resolve('ok')
			})
		})
	},
)

// during dev, we'll keep the build module up to date with the changes
if (process.env.NODE_ENV === 'development') {
	const BUILD_PATH = '../../build/index.js'
	const { default: chokidar } = await import('chokidar')

	// eslint-disable-next-line no-inner-declarations
	async function reloadBuild() {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		devBuild = await import(`${BUILD_PATH}?update=${Date.now()}`)
		broadcastDevReady(devBuild)
	}

	const dirname = getDirname(import.meta.url)
	const watchPath = path.join(dirname, BUILD_PATH).replace(/\\/g, '/')
	const watcher = chokidar.watch(watchPath, { ignoreInitial: true })
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	watcher.on('all', reloadBuild)
}
