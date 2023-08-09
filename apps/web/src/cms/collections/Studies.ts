import { type CollectionConfig } from 'payload/dist/collections/config/types'

import { CTAGrid } from '../blocks/CTAGrid'
import { CallToAction } from '../blocks/CallToAction'
import { Content } from '../blocks/Content'
import { ImageBlock } from '../blocks/Image'
import { ImageCollage } from '../blocks/ImageCollage'
import { ImageContentCollage } from '../blocks/ImageContentCollage'
import { ImageGrid } from '../blocks/ImageGrid'
import { ImageStatCollage } from '../blocks/ImageStatCollage'
import { Slider } from '../blocks/Slider'
import { Spacer } from '../blocks/Spacer'
import { Statistics } from '../blocks/Statistics'
import { StickyContent } from '../blocks/StickyContent'
import { StudySlider } from '../blocks/StudySlider'
import { metaField } from '../fields/meta'
import { ogImage } from '../fields/meta/ogImage'
import { slugField } from '../fields/slug'

export const Studies: CollectionConfig = {
	slug: 'studies',
	fields: [
		{
			name: 'title',
			label: 'Title',
			type: 'text',
			required: true,
		},
		{
			name: 'featuredImage',
			label: 'Featured Image',
			type: 'upload',
			relationTo: 'media',
			required: true,
		},
		{
			name: 'layout',
			label: 'Study Layout',
			type: 'blocks',
			blocks: [
				CallToAction,
				Content,
				CTAGrid,
				ImageBlock,
				ImageCollage,
				ImageContentCollage,
				ImageGrid,
				ImageStatCollage,
				Slider,
				Spacer,
				Statistics,
				StickyContent,
				StudySlider,
			],
		},
		{
			name: 'previewImages',
			label: 'Preview Images',
			type: 'array',
			minRows: 1,
			maxRows: 3,
			fields: [
				{
					name: 'image',
					label: 'Image',
					type: 'upload',
					relationTo: 'media',
					required: true,
				},
			],
		},
		{
			name: 'client',
			label: 'Client',
			type: 'text',
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'location',
			label: 'Location',
			type: 'text',
			admin: { position: 'sidebar' },
		},
		{
			name: 'categories',
			label: 'Categories',
			type: 'relationship',
			relationTo: 'categories',
			hasMany: true,
			admin: {
				position: 'sidebar',
			},
		},
		slugField(),
		metaField(undefined, undefined, { fields: [ogImage()] }),
	],
}
