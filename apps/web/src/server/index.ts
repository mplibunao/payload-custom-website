import { type ServerBuild, broadcastDevReady } from '@remix-run/node'
import closeWithGrace, { type Signals } from 'close-with-grace'
import express from 'express'
import path from 'path'
import { getDirname } from '~/shared/esm.ts'

import { initApp } from './app.ts'
import { config } from './infra/config.ts'

const dirname = getDirname(import.meta.url)
// use absolute path so we can just pass the build path and use it anywhere without breaking hmr due to relative paths
const BUILD_PATH = path
	.join(dirname, config.remix.buildPath)
	.replace(/\\/g, '/')

// this file may not exist if you haven't built yet, but it will
// definitely exist by the time the dev or prod server actually runs.
// since we are bundling express code, we don't want to bundle build/** together with it since remix already handles that for us (and since it breaks)
// therefore use run-time imports. See https://esbuild.github.io/api/#non-analyzable-imports
// we use env for build path because in dev path is `../..` while in prod `..`
let build = (await import(BUILD_PATH)) as unknown as ServerBuild

const app = express()
const appWithMiddlewares = await initApp(app, { config, build, BUILD_PATH })

const server = appWithMiddlewares.listen(config.server.port, () => {
	console.log(`✅ server started on ${config.server.port}`)
	if (config.env.NODE_ENV === 'development') {
		broadcastDevReady(build)
	}
})

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace(
	{ delay: 5000 },
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
