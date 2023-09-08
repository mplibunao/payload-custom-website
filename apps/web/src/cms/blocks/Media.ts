import { type Block } from 'payload/types'

export const MediaBlock: Block = {
	slug: 'media',
	labels: {
		singular: 'Media',
		plural: 'Media Blocks',
	},
	interfaceName: 'MediaBlockType',
	fields: [
		{
			name: 'media',
			label: 'Media',
			type: 'upload',
			relationTo: 'media',
			required: true,
		},
		{
			name: 'type',
			label: 'Type',
			type: 'radio',
			defaultValue: 'card',
			required: true,
			options: [
				{
					label: 'Normal',
					value: 'normal',
				},
				{
					label: 'Fullscreen',
					value: 'fullscreen',
				},
				{
					label: 'Wide',
					value: 'wide',
				},
			],
			admin: {
				layout: 'horizontal',
			},
		},
		{
			name: 'caption',
			label: 'Caption',
			type: 'richText',
			admin: {
				elements: ['link'],
			},
		},
	],
}
