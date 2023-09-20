import { type CollectionConfig } from 'payload/dist/collections/config/types'

import { CTAGrid } from '../blocks/CTAGrid'
import { CallToAction } from '../blocks/CallToAction'
import { Content } from '../blocks/Content'
import { MediaBlock } from '../blocks/Media'
import { MediaCollage } from '../blocks/MediaCollage'
import { MediaContentCollage } from '../blocks/MediaContentCollage'
import { MediaGrid } from '../blocks/MediaGrid'
import { MediaStatCollage } from '../blocks/MediaStatCollage'
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
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'title',
			label: 'Title',
			type: 'text',
			required: true,
		},
		{
			name: 'featuredMedia',
			label: 'Featured Media',
			type: 'upload',
			relationTo: 'media',
			required: true,
			admin: {
				description:
					'Please provide the highest quality image possible so we can deliver high quality images to retina screens and 4k monitors',
			},
		},
		{
			name: 'layout',
			label: 'Study Layout',
			type: 'blocks',
			blocks: [
				CallToAction,
				Content,
				CTAGrid,
				MediaBlock,
				MediaCollage,
				MediaContentCollage,
				MediaGrid,
				MediaStatCollage,
				Slider,
				Spacer,
				Statistics,
				StickyContent,
				StudySlider,
			],
		},
		{
			name: 'previewMedia',
			label: 'Preview Media',
			type: 'array',
			minRows: 1,
			maxRows: 3,
			fields: [
				{
					name: 'media',
					label: 'Media',
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
