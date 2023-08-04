import { type Block } from 'payload/types'

export const ImageCollage: Block = {
	slug: 'image-collage',
	labels: {
		singular: 'Image Collage',
		plural: 'Image Collages',
	},
	fields: [
		{
			name: 'images',
			label: 'Images',
			type: 'array',
			minRows: 3,
			maxRows: 6,
			fields: [
				{
					type: 'upload',
					name: 'image',
					relationTo: 'media',
					required: true,
				},
			],
		},
	],
}
