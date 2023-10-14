import { type GroupField, type Field } from 'payload/types'
import { deepMerge } from '~/cms/utils/deepMerge'

import { blockFields } from '../blockFields'
import { baseMetaField } from './base'
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
			admin: {
				description:
					'These fields help improve Search Engine Optimization or SEO',
			},
			fields: [
				...baseMetaField({ required: false }),
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
								beforeValidate: [() => new Date()],
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
						defaultValue: undefined,
						interfaceName: 'MetaArticle',
						hooks: {
							beforeChange: [
								({ siblingData }) => {
									if (siblingData?.type !== 'article') {
										delete siblingData.article
									}
								},
							],
						},
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
						hooks: {
							beforeChange: [
								(args) => {
									if (args.siblingData?.type !== 'book') {
										delete args.siblingData.book
									}
								},
							],
						},
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
						hooks: {
							beforeChange: [
								(args) => {
									if (args.siblingData?.type !== 'video.movie') {
										delete args.siblingData.movie
									}
								},
							],
						},
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
						hooks: {
							beforeChange: [
								(args) => {
									if (args.siblingData?.type !== 'video.episode') {
										delete args.siblingData.videoEpisode
									}
								},
							],
						},
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
						hooks: {
							beforeChange: [
								(args) => {
									if (args.siblingData?.type !== 'video.tv_show') {
										delete args.siblingData.videoTvShow
									}
								},
							],
						},
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
						hooks: {
							beforeChange: [
								(args) => {
									if (args.siblingData?.type !== 'video.other') {
										delete args.siblingData.videoOther
									}
								},
							],
						},
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
						hooks: {
							beforeChange: [
								(args) => {
									if (args.siblingData?.type !== 'profile') {
										delete args.siblingData.profile
									}
								},
							],
						},
					},
				}),

				...(additions.fields ?? []),
			],
		},
		overrides,
	)
}
