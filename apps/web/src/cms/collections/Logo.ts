import path from 'path'
import { type CollectionConfig } from 'payload/types'
import { optimize } from 'svgo'

import { backgroundColor } from '../fields/backgroundColor'

export const Logo: CollectionConfig = {
	slug: 'logo',
	access: {
		read: () => true,
	},
	upload: {
		staticDir: path.resolve(__dirname, '../../../media/logo'),
		staticURL: '/media/logo',
		disableLocalStorage: process.env.NODE_ENV === 'production',
		mimeTypes: ['image/svg+xml'],
	},
	hooks: {
		beforeChange: [
			({ data, req }) => {
				console.info(req.files, 'req.files')
				// eslint-disable-next-line
				if (!req.files?.file?.data) {
					return data
				}

				// eslint-disable-next-line
				const svgString = req.files.file.data.toString() as string
				const result = optimize(svgString)

				return {
					...data,
					inline: result.data,
				}
			},
		],
	},
	fields: [
		{
			name: 'alt',
			label: 'Alt Text',
			type: 'text',
			required: true,
		},
		{
			name: 'padding',
			label: 'Padding',
			type: 'select',
			defaultValue: 'none',
			options: [
				{ label: 'None', value: 'none' },
				{ label: '4px', value: '4px' },
				{ label: '8px', value: '8px' },
				{ label: '12px', value: '12px' },
				{ label: '16px', value: '16px' },
			],
		},
		backgroundColor(),
		{
			name: 'inline',
			label: 'Inline SVG',
			type: 'textarea',
			admin: {
				description:
					'Leave this blank. Contains generated optimized inline svg',
			},
		},
	],
}
