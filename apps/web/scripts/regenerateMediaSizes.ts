import path from 'node:path'
import payload from 'payload'
import { MEDIA_LOCAL_DIR } from '~/constants'
import { config } from '~/server/infra/config.server'

const regenerateMediaSizes = async () => {
	try {
		await payload.init({
			...config.payload,
			local: true,
		})
		payload.logger.info('started payload. Searching for existing media')

		const media = await payload.find({
			collection: 'media',
			depth: 0,
			limit: 300,
		})

		payload.logger.info(
			`Found ${media.totalDocs} media... will start regenerating media`,
		)

		await Promise.all(
			media.docs.map(async (mediaDoc) => {
				try {
					const staticDir = path.resolve(__dirname, `..${MEDIA_LOCAL_DIR}`)
					if (!mediaDoc.filename) return
					//if (mediaDoc.filename !== 'hancock-7.jpg') return

					await payload.update({
						collection: 'media',
						id: mediaDoc.id,
						data: mediaDoc,
						filePath: `${staticDir}/${mediaDoc.filename}`,
						overwriteExistingFiles: true,
					})

					payload.logger.info(
						`Media ${mediaDoc.alt || mediaDoc.id} regenerated successfully`,
					)
				} catch (err) {
					payload.logger.error(
						`Media ${mediaDoc.alt || mediaDoc.id} failed to regenerate`,
					)
					payload.logger.error(err)
				}
			}),
		)
	} catch (err) {
		console.log('Unable to find documents with payload')
		console.error(err)
		process.exit(0)
	}

	console.log('Media size regeneration completed!')
	process.exit(0)
}

void regenerateMediaSizes()
