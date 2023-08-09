import { type GroupField, type Field } from 'payload/types'
import { deepMerge } from '~/cms/utils/deepMerge'

import { blockFields } from '../blockFields'
import { profileField } from './profile'
import { tagField } from './tag'
import { videoField } from './video'

export type Type = {
	meta?: {
		title?: string
		description?: string
		keywords?: string
	}
}

type FieldOptions = {
	required?: boolean
}

type MetaField = (
	fieldOptions?: FieldOptions,
	overrides?: Partial<GroupField>,
	additions?: {
		fields?: Field[]
	},
) => Field

export const metaField: MetaField = (
	{ required = true } = {},
	overrides,
	additions = {
		fields: [],
	},
): Field => {
	return deepMerge(
		{
			interfaceName: 'Meta',
			name: 'meta',
			label: 'Meta',
			type: 'group',
			fields: [
				{
					name: 'title',
					label: 'Title',
					type: 'text',
					required,
					admin: {
						description: 'Page title',
					},
				},
				{
					name: 'description',
					label: 'Description',
					type: 'textarea',
					required,
				},
				{
					name: 'type',
					label: 'Type',
					type: 'select',
					required,
					defaultValue: 'website',
					options: [
						{
							label: 'Website',
							value: 'website',
						},
						{
							label: 'Article',
							value: 'article',
						},
						{
							label: 'Profile',
							value: 'profile',
						},
						{
							label: 'Book',
							value: 'book',
						},
						{
							label: 'Movie',
							value: 'video.movie',
						},
						{
							label: 'TV Show',
							value: 'video.tv_show',
						},
						{
							label: 'Video Episode',
							value: 'video.episode',
						},
						{
							label: 'Other Video',
							value: 'video.other',
						},
					],
				},

				blockFields({
					name: 'article',
					fields: [
						{
							name: 'author',
							labels: {
								singular: 'Author',
								plural: 'Authors',
							},
							type: 'array',
							fields: [
								{
									type: 'text',
									name: 'profile',
									label: 'Profile URL',
								},
								...profileField,
							],
						},
						{
							name: 'section',
							label: 'Section Name',
							type: 'text',
							admin: {
								description: 'A high-level section name. Eg. Technology',
							},
						},
						tagField,
						{
							name: 'publishedAt',
							label: 'Published At',
							type: 'date',
							defaultValue: () => new Date(),
							admin: {
								date: {
									pickerAppearance: 'dayAndTime',
								},
							},
						},
						{
							name: 'updatedAt',
							label: 'Last Updated At',
							type: 'date',
							admin: {
								date: {
									pickerAppearance: 'dayAndTime',
								},
								hidden: true,
							},
							hooks: {
								beforeValidate: [
									() => {
										return new Date()
									},
								],
							},
						},
						{
							name: 'outdatedAt',
							label: 'Outdated At',
							type: 'date',
							admin: {
								description: 'When the article is out of date',
								date: {
									pickerAppearance: 'dayAndTime',
								},
							},
						},
					],
					overrides: {
						admin: {
							condition: (_, siblingData) => siblingData?.type === 'article',
						},
						interfaceName: 'MetaArticle',
					},
				}),

				blockFields({
					name: 'book',
					fields: [
						{
							name: 'author',
							labels: {
								singular: 'Author',
								plural: 'Authors',
							},
							type: 'array',
							fields: [
								{
									type: 'text',
									name: 'profile',
									label: 'Profile URL',
								},
								...profileField,
							],
						},
						{
							name: 'book:isbn',
							label: 'Book ISBN',
							type: 'text',
						},
						{
							name: 'publishedAt',
							label: 'Published At',
							type: 'date',
							defaultValue: () => new Date(),
							admin: {
								date: {
									pickerAppearance: 'dayAndTime',
								},
							},
						},
						tagField,
					],
					overrides: {
						admin: {
							condition: (_, siblingData) => siblingData?.type === 'book',
						},
						interfaceName: 'MetaBook',
					},
				}),

				blockFields({
					name: 'movie',
					fields: videoField,
					overrides: {
						admin: {
							condition: (_, siblingData) =>
								siblingData?.type === 'video.movie',
						},
						interfaceName: 'MetaMovie',
					},
				}),

				blockFields({
					name: 'videoEpisode',
					fields: [
						...videoField,
						blockFields({
							name: 'videoSeries',
							fields: [
								{
									name: 'tvShow',
									label: 'TV Show URL',
									type: 'text',
								},
								...videoField,
							],
						}),
					],
					overrides: {
						admin: {
							condition: (_, siblingData) =>
								siblingData?.type === 'video.episode',
						},
						interfaceName: 'MetaVideoEpisode',
					},
				}),

				blockFields({
					name: 'videoTvShow',
					fields: videoField,
					overrides: {
						admin: {
							condition: (_, siblingData) =>
								siblingData?.type === 'video.tv_show',
						},
						interfaceName: 'MetaTVShow',
					},
				}),

				blockFields({
					name: 'videoOther',
					fields: videoField,
					overrides: {
						admin: {
							condition: (_, siblingData) =>
								siblingData?.type === 'video.other',
						},
						interfaceName: 'MetaVideoOther',
					},
				}),

				/*
				 *Profile
				 */
				blockFields({
					name: 'profile',
					fields: profileField,
					overrides: {
						admin: {
							condition: (_, siblingData) => siblingData?.type === 'profile',
						},
						interfaceName: 'MetaProfile',
					},
				}),

				...(additions.fields ?? []),
			],
		},
		overrides,
	)
}
