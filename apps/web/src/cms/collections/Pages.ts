import type { CollectionConfig } from 'payload/types'

import { CTAGrid } from '../blocks/CTAGrid'
import { CallToAction } from '../blocks/CallToAction'
import { Content } from '../blocks/Content'
import { Image } from '../blocks/Image'
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
import { slugField } from '../fields/slug'

export const Pages: CollectionConfig = {
	slug: 'pages',
	admin: {
		useAsTitle: 'title',
	},
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
			type: 'radio',
			name: 'heroType',
			label: 'Hero Type',
			required: true,
			defaultValue: 'minimal',
			options: [
				{
					label: 'Minimal',
					value: 'minimal',
				},
				{
					label: 'Content Above Image',
					value: 'contentAboveImage',
				},
				{
					label: 'Content Left of Image',
					value: 'contentLeftOfImage',
				},
			],
		},
		{
			name: 'heroContent',
			label: 'Hero Content',
			type: 'richText',
			required: true,
		},
		{
			name: 'heroImage',
			label: 'Hero Image',
			type: 'upload',
			relationTo: 'media',
			required: true,
			admin: {
				condition: (_, siblingData) =>
					siblingData?.heroType === 'contentAboveImage' ||
					siblingData?.heroType === 'contentLeftOfImage',
			},
		},
		{
			name: 'layout',
			label: 'Page Layout',
			type: 'blocks',
			minRows: 1,
			blocks: [
				CallToAction,
				Content,
				CTAGrid,
				Image,
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
		slugField(),
		metaField,
	],
}
