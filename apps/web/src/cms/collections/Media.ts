import path from 'path'
import { type CollectionConfig } from 'payload/types'
import { imagorService } from '~/app/utils/imagor.service'
import { MEDIA_LOCAL_DIR } from '~/constants'

export const Media: CollectionConfig = {
	slug: 'media',
	access: {
		read: (): boolean => true, // Everyone can read Media
		create: () => true,
	},
	upload: {
		staticDir: path.resolve(__dirname, `../../..${MEDIA_LOCAL_DIR}`),
		staticURL: MEDIA_LOCAL_DIR,
		disableLocalStorage: process.env.NODE_ENV === 'production',
		adminThumbnail: ({ doc }) => {
			// don't set format so auto-avif and auto-webp kicks in
			const thumbnail = imagorService
				.setImagorUrl(process.env.PAYLOAD_PUBLIC_IMAGOR_URL)
				.resize(640, 480)
				.setImagePath(doc.filename as string)
				.filter('quality(50)')
				.buildUrl()
			return thumbnail
		},
	},
	fields: [
		{
			name: 'alt',
			label: 'Alt Text',
			type: 'text',
			required: true,
		},
	],
}
