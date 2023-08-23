import { type ServerBuild, broadcastDevReady } from '@remix-run/node'
import closeWithGrace, { type Signals } from 'close-with-grace'
import express from 'express'
import { type Server } from 'http'
import type Redis from 'ioredis'
import { type Mongoose } from 'mongoose'
import path from 'path'
import { type Logger } from 'pino'

import { initApp } from './app'
import { config } from './infra/config.server'

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

			await Promise.allSettled([
				closeDBConnection(
					app.locals.payload.globals.Model.base,
					app.locals.logger,
				),
				closeServer(server, app.locals.logger),
				closeRedisConnection(app.locals.redis, app.locals.logger),
			])
			closeListeners.uninstall()
		},
	)
}

async function closeRedisConnection(redis: Redis, logger: Logger) {
	return new Promise((resolve, reject) => {
		void redis.quit((err, result) => {
			if (err) {
				logger.error({ err }, 'Error closing redis connection')
				return reject(err)
			}
			return resolve(result)
		})
	})
}

async function closeDBConnection(mongoose: Mongoose, logger: Logger) {
	return new Promise((resolve, reject) => {
		mongoose.disconnect((err) => {
			if (err) {
				logger.error({ err }, 'Error closing mongoose connection')
				reject(err)
			} else {
				resolve('ok')
			}
		})
	})
}

async function closeServer(server: Server, logger: Logger) {
	await new Promise((resolve, reject) => {
		server.close((error) => {
			if (error) {
				logger.error({ error }, 'Error closing server')
				reject(error)
			} else {
				resolve('ok')
			}
		})
	})
}
