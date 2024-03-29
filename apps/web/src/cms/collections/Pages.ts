import type { CollectionConfig } from 'payload/types'
import { getPage, invalidatePage } from '~/app/modules/page/page.service.server'

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
import { contentType } from '../fields/contentType'
import { metaField } from '../fields/meta'
import { ogImage } from '../fields/meta/ogImage'
import { richText } from '../fields/richText'
import { slugField } from '../fields/slug'
import { beforeDuplicateSlug } from '../utils/beforeDuplicate'

export const Pages: CollectionConfig = {
	slug: 'pages',
	admin: {
		useAsTitle: 'title',
		hooks: {
			beforeDuplicate: beforeDuplicateSlug,
		},
	},
	access: {
		read: () => true,
	},
	hooks: {
		afterChange: [
			async ({ doc, req }) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				if (req.payload.local) return doc

				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				const slug = doc.slug as string
				await invalidatePage(req.app.locals, slug)
				await getPage(req.app.locals, slug)

				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				return doc
			},
		],
		afterDelete: [
			async ({ req, doc }) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				if (req.payload.local) return doc

				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				await invalidatePage(req.app.locals, doc.slug as string)
			},
		],
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
					label: 'Content Above Media',
					value: 'contentAboveMedia',
				},
				{
					label: 'Content Left of Media',
					value: 'contentLeftOfMedia',
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
					siblingData?.heroType === 'contentAboveMedia' ||
					siblingData?.heroType === 'contentLeftOfMedia',
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
		contentType,
		metaField(undefined, undefined, { fields: [ogImage()] }),
	],
}
