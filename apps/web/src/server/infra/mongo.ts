import { type Mongoose } from 'mongoose'
import { type Logger } from 'pino'

// need to separate this from entrypoint so we can import this for helpers without starting the server

export async function closeDBConnection(mongoose: Mongoose, logger: Logger) {
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
