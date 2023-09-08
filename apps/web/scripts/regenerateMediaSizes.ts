import path from 'path'
import payload from 'payload'
import { MEDIA_LOCAL_DIR } from '~/constants'
import { config } from '~/server/infra/config.server'

const regenerateMediaSizes = async () => {
	try {
		await payload.init({
			...config.payload,
			local: true,
		})

		const media = await payload.find({
			collection: 'media',
			depth: 0,
			limit: 300,
		})
		await Promise.all(
			media.docs.map(async (mediaDoc) => {
				try {
					const staticDir = path.resolve(__dirname, `..${MEDIA_LOCAL_DIR}`)
					if (!mediaDoc.filename) return

					await payload.update({
						collection: 'media',
						id: mediaDoc.id,
						data: mediaDoc,
						filePath: `${staticDir}/${mediaDoc.filename}`,
						overwriteExistingFiles: true,
					})

					console.log(
						`Media ${mediaDoc.alt || mediaDoc.id} regenerated successfully`,
					)
				} catch (err) {
					console.error(
						`Media ${mediaDoc.alt || mediaDoc.id} failed to regenerate`,
					)
					console.error(err)
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
