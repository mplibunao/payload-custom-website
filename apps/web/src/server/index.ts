import { type ServerBuild, broadcastDevReady } from '@remix-run/node'
import closeWithGrace, { type Signals } from 'close-with-grace'
import { join } from 'desm'
import express from 'express'

import { initApp } from './app.ts'
import { config } from './infra/config.ts'

// use absolute path so we can just pass the build path and use it anywhere without breaking hmr due to relative paths
const buildPath = join(import.meta.url, config.remix.buildPath).replace(
	/\\/g,
	'/',
)
console.info(buildPath, 'buildPath')

// this file may not exist if you haven't built yet, but it will
// definitely exist by the time the dev or prod server actually runs.
// since we are bundling express code, we don't want to bundle build/** together with it since remix already handles that for us (and since it breaks)
// therefore use run-time imports. See https://esbuild.github.io/api/#non-analyzable-imports
// we use env for build path because in dev path is `../..` while in prod `..`
let build = (await import(buildPath)) as unknown as ServerBuild

const app = await initApp(express(), { config, build, buildPath })

const server = app.listen(config.server.port, () => {
	app.locals.logger.info(`server started on ${config.server.port}`)
	if (config.env.NODE_ENV === 'development') {
		broadcastDevReady(build)
	}
})

// delay is the number of milliseconds for the graceful close to finish
const delay = config.app.APP_ENV === 'production' ? 5000 : 0
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
			app.locals.logger.error(err)
		}

		app.locals.logger.info({ signal, manual }, 'closing application')

		await new Promise((resolve, reject) => {
			server.close((e) => {
				closeListeners.uninstall()
				return e ? reject(e) : resolve('ok')
			})
		})
	},
)
