import type { CollectionConfig } from 'payload/types'

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
import { richText } from '../fields/richText'
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
		richText(
			{ name: 'heroContent', label: 'Hero Content' },
			{ preElements: ['h1'] },
		),
		{
			name: 'heroMedia',
			label: 'Hero Media',
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
			required: true,
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
		slugField(),
		metaField(undefined, undefined, { fields: [ogImage()] }),
	],
}
