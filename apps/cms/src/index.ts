import closeWithGrace, { type Signals } from 'close-with-grace'
import express from 'express'

import { initApp } from './app'
import { config } from './infra/config'

void start()

async function start() {
	const app = await initApp(express(), { config })

	const server = app.listen(config.server.port, () => {
		app.locals.logger.info(`server started on ${config.server.port}`)
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
