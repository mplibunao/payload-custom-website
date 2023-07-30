import { type ServerBuild, broadcastDevReady } from '@remix-run/node'
import closeWithGrace, { type Signals } from 'close-with-grace'
import express from 'express'
import path from 'path'

import { initApp } from './app'
import { config } from './infra/config'

void start()

async function start() {
	// use absolute path so we can just pass the build path and use it anywhere without breaking hmr due to relative paths
	const buildPath = path
		.join(__dirname, config.remix.buildPath)
		.replace(/\\/g, '/')
	let build = require(buildPath) as unknown as ServerBuild

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
}
