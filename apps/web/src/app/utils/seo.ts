/* eslint-disable max-lines */

import { type MetaFunction } from '@remix-run/node'
import { type ServerRuntimeMetaDescriptor } from '@remix-run/server-runtime'
import { type Meta } from '~/cms/payload-types'

import { type SiteInfo } from '../modules/globals/site.service.server'
import { imagorService } from './imagor.service'

export const mergeTitle = (pageTitle: string, siteTitle?: string) => {
	return siteTitle ? `${pageTitle} | ${siteTitle}` : pageTitle
}

type MetaResult = ReturnType<MetaFunction>
type MetaMapper = (meta: Meta, metaResult: MetaResult) => MetaResult

const getProfileMeta: MetaMapper = (meta, metaResult) => {
	if (!meta.profile) {
		return metaResult
	}
	if (meta.profile.firstName) {
		metaResult.push({
			name: 'profile:first_name',
			content: meta.profile.firstName,
		})
	}
	if (meta.profile?.lastName) {
		metaResult.push({
			name: 'profile:last_name',
			content: meta.profile.lastName,
		})
	}
	if (meta.profile?.username) {
		metaResult.push({
			name: 'profile:username',
			content: meta.profile.username,
		})
	}
	if (meta.profile?.gender) {
		metaResult.push({
			name: 'profile:gender',
			content: meta.profile.gender,
		})
	}
	return metaResult
}

const getArticleMeta: MetaMapper = (meta, metaResult) => {
	if (!meta.article) {
		return metaResult
	}

	if (meta.article.publishedAt) {
		metaResult.push({
			name: 'article:published_time',
			content: meta.article.publishedAt,
		})
	}
	if (meta.article?.updatedAt) {
		metaResult.push({
			name: 'article:modified_time',
			content: meta.article.updatedAt,
		})
	}
	if (meta.article?.section) {
		metaResult.push({
			name: 'article:section',
			content: meta.article.section,
		})
	}
	if (meta.article?.outdatedAt) {
		metaResult.push({
			name: 'article:expiration_time',
			content: meta.article.outdatedAt,
		})
	}

	// Mapping article author profiles
	if (meta.article?.author) {
		meta.article.author.forEach((author) => {
			if (author.profile) {
				metaResult.push({
					name: 'article:author',
					content: author.profile,
				})
			}
			if (author.firstName) {
				metaResult.push({
					name: 'profile:first_name',
					content: author.firstName,
				})
			}
			if (author.lastName) {
				metaResult.push({
					name: 'profile:last_name',
					content: author.lastName,
				})
			}
			if (author.username) {
				metaResult.push({
					name: 'profile:username',
					content: author.username,
				})
			}
			if (author.gender) {
				metaResult.push({
					name: 'profile:gender',
					content: author.gender,
				})
			}
		})
	}

	// Mapping article tag fields
	if (meta.article?.tag) {
		meta.article.tag.forEach(({ tag }) => {
			metaResult.push({
				name: 'article:tag',
				content: tag,
			})
		})
	}
	return metaResult
}

const getOtherVideoMeta: MetaMapper = (meta, metaResult) => {
	if (!meta.videoOther) {
		return metaResult
	}

	if (meta.videoOther.actor) {
		meta.videoOther.actor.forEach((actor) => {
			if (actor.profile) {
				metaResult.push({
					name: 'video:actor',
					content: actor.profile,
				})
			}
			if (actor.firstName) {
				metaResult.push({
					name: 'profile:first_name',
					content: actor.firstName,
				})
			}
			if (actor.lastName) {
				metaResult.push({
					name: 'profile:last_name',
					content: actor.lastName,
				})
			}
			if (actor.username) {
				metaResult.push({
					name: 'profile:username',
					content: actor.username,
				})
			}
			if (actor.gender) {
				metaResult.push({
					name: 'profile:gender',
					content: actor.gender,
				})
			}
			if (actor.role) {
				metaResult.push({
					name: 'video:actor:role',
					content: actor.role,
				})
			}
		})
	}

	// Mapping director profiles
	if (meta.videoOther.director) {
		meta.videoOther.director.forEach((director) => {
			if (director.profile) {
				metaResult.push({
					name: 'video:director',
					content: director.profile,
				})
			}
			if (director.firstName) {
				metaResult.push({
					name: 'profile:first_name',
					content: director.firstName,
				})
			}
			if (director.lastName) {
				metaResult.push({
					name: 'profile:last_name',
					content: director.lastName,
				})
			}
			if (director.username) {
				metaResult.push({
					name: 'profile:username',
					content: director.username,
				})
			}
			if (director.gender) {
				metaResult.push({
					name: 'profile:gender',
					content: director.gender,
				})
			}
		})
	}

	// Mapping writer profiles
	if (meta.videoOther.writer) {
		meta.videoOther.writer.forEach((writer) => {
			if (writer.profile) {
				metaResult.push({
					name: 'video:writer',
					content: writer.profile,
				})
			}
			if (writer.firstName) {
				metaResult.push({
					name: 'profile:first_name',
					content: writer.firstName,
				})
			}
			if (writer.lastName) {
				metaResult.push({
					name: 'profile:last_name',
					content: writer.lastName,
				})
			}
			if (writer.username) {
				metaResult.push({
					name: 'profile:username',
					content: writer.username,
				})
			}
			if (writer.gender) {
				metaResult.push({
					name: 'profile:gender',
					content: writer.gender,
				})
			}
		})
	}

	if (meta.videoOther.duration) {
		metaResult.push({
			name: 'video:duration',
			content: meta.videoOther.duration.toString(),
		})
	}

	if (meta.videoOther.releaseDate) {
		metaResult.push({
			name: 'video:release_date',
			content: meta.videoOther.releaseDate,
		})
	}

	// Mapping tag fields
	if (meta.videoOther.tag) {
		meta.videoOther.tag.forEach(({ tag }) => {
			metaResult.push({
				name: 'video:tag',
				content: tag,
			})
		})
	}
	return metaResult
}

const getBookMeta: MetaMapper = (meta, metaResult) => {
	if (!meta.book) {
		return metaResult
	}

	if (meta.book.publishedAt) {
		metaResult.push({
			name: 'book:release_date',
			content: meta.book.publishedAt,
		})
	}

	// Mapping book author profiles
	if (meta.book.author) {
		meta.book.author.forEach((author) => {
			if (author.profile) {
				metaResult.push({
					name: 'book:author',
					content: author.profile,
				})
			}
			if (author.firstName) {
				metaResult.push({
					name: 'profile:first_name',
					content: author.firstName,
				})
			}
			if (author.lastName) {
				metaResult.push({
					name: 'profile:last_name',
					content: author.lastName,
				})
			}
			if (author.username) {
				metaResult.push({
					name: 'profile:username',
					content: author.username,
				})
			}
			if (author.gender) {
				metaResult.push({
					name: 'profile:gender',
					content: author.gender,
				})
			}
		})
	}

	// Mapping book tag fields
	if (meta.book.tag) {
		meta.book.tag.forEach(({ tag }) => {
			metaResult.push({
				name: 'book:tag',
				content: tag,
			})
		})
	}

	if (meta.book['book:isbn']) {
		metaResult.push({
			name: 'book:isbn',
			content: meta.book['book:isbn'],
		})
	}
	return metaResult
}

const getEpisodeMeta: MetaMapper = (meta, metaResult) => {
	if (!meta.videoEpisode) {
		return metaResult
	}

	// Mapping actor profiles
	if (meta.videoEpisode.actor) {
		meta.videoEpisode.actor.forEach((actor) => {
			if (actor.profile) {
				metaResult.push({
					name: 'video:actor',
					content: actor.profile,
				})
			}
			if (actor.firstName) {
				metaResult.push({
					name: 'profile:first_name',
					content: actor.firstName,
				})
			}
			if (actor.lastName) {
				metaResult.push({
					name: 'profile:last_name',
					content: actor.lastName,
				})
			}
			if (actor.username) {
				metaResult.push({
					name: 'profile:username',
					content: actor.username,
				})
			}
			if (actor.gender) {
				metaResult.push({
					name: 'profile:gender',
					content: actor.gender,
				})
			}
			if (actor.role) {
				metaResult.push({
					name: 'video:actor:role',
					content: actor.role,
				})
			}
		})
	}

	// Mapping director profiles
	if (meta.videoEpisode.director) {
		meta.videoEpisode.director.forEach((director) => {
			if (director.profile) {
				metaResult.push({
					name: 'video:director',
					content: director.profile,
				})
			}
			if (director.firstName) {
				metaResult.push({
					name: 'profile:first_name',
					content: director.firstName,
				})
			}
			if (director.lastName) {
				metaResult.push({
					name: 'profile:last_name',
					content: director.lastName,
				})
			}
			if (director.username) {
				metaResult.push({
					name: 'profile:username',
					content: director.username,
				})
			}
			if (director.gender) {
				metaResult.push({
					name: 'profile:gender',
					content: director.gender,
				})
			}
		})
	}

	// Mapping writer profiles
	if (meta.videoEpisode.writer) {
		meta.videoEpisode.writer.forEach((writer) => {
			if (writer.profile) {
				metaResult.push({
					name: 'video:writer',
					content: writer.profile,
				})
			}
			if (writer.firstName) {
				metaResult.push({
					name: 'profile:first_name',
					content: writer.firstName,
				})
			}
			if (writer.lastName) {
				metaResult.push({
					name: 'profile:last_name',
					content: writer.lastName,
				})
			}
			if (writer.username) {
				metaResult.push({
					name: 'profile:username',
					content: writer.username,
				})
			}
			if (writer.gender) {
				metaResult.push({
					name: 'profile:gender',
					content: writer.gender,
				})
			}
		})
	}

	if (meta.videoEpisode.duration) {
		metaResult.push({
			name: 'video:duration',
			content: meta.videoEpisode.duration.toString(),
		})
	}

	if (meta.videoEpisode.releaseDate) {
		metaResult.push({
			name: 'video:release_date',
			content: meta.videoEpisode.releaseDate,
		})
	}

	// Mapping tag fields
	if (meta.videoEpisode.tag) {
		meta.videoEpisode.tag.forEach(({ tag }) => {
			metaResult.push({
				name: 'video:tag',
				content: tag,
			})
		})
	}

	return metaResult
}

const getMovieMeta: MetaMapper = (meta, metaResult) => {
	if (!meta.videoEpisode) {
		return metaResult
	}

	if (meta.videoEpisode.actor) {
		meta.videoEpisode.actor.forEach((actor) => {
			if (actor.profile) {
				metaResult.push({
					name: 'video:actor',
					content: actor.profile,
				})
			}
			if (actor.firstName) {
				metaResult.push({
					name: 'profile:first_name',
					content: actor.firstName,
				})
			}
			if (actor.lastName) {
				metaResult.push({
					name: 'profile:last_name',
					content: actor.lastName,
				})
			}
			if (actor.username) {
				metaResult.push({
					name: 'profile:username',
					content: actor.username,
				})
			}
			if (actor.gender) {
				metaResult.push({
					name: 'profile:gender',
					content: actor.gender,
				})
			}
			if (actor.role) {
				metaResult.push({
					name: 'video:actor:role',
					content: actor.role,
				})
			}
		})
	}

	if (meta.videoEpisode.director) {
		meta.videoEpisode.director.forEach((director) => {
			if (director.profile) {
				metaResult.push({
					name: 'video:director',
					content: director.profile,
				})
			}
			if (director.firstName) {
				metaResult.push({
					name: 'profile:first_name',
					content: director.firstName,
				})
			}
			if (director.lastName) {
				metaResult.push({
					name: 'profile:last_name',
					content: director.lastName,
				})
			}
			if (director.username) {
				metaResult.push({
					name: 'profile:username',
					content: director.username,
				})
			}
			if (director.gender) {
				metaResult.push({
					name: 'profile:gender',
					content: director.gender,
				})
			}
		})
	}

	if (meta.videoEpisode.writer) {
		meta.videoEpisode.writer.forEach((writer) => {
			if (writer.profile) {
				metaResult.push({
					name: 'video:writer',
					content: writer.profile,
				})
			}
			if (writer.firstName) {
				metaResult.push({
					name: 'profile:first_name',
					content: writer.firstName,
				})
			}
			if (writer.lastName) {
				metaResult.push({
					name: 'profile:last_name',
					content: writer.lastName,
				})
			}
			if (writer.username) {
				metaResult.push({
					name: 'profile:username',
					content: writer.username,
				})
			}
			if (writer.gender) {
				metaResult.push({
					name: 'profile:gender',
					content: writer.gender,
				})
			}
		})
	}

	if (meta.videoEpisode.duration) {
		metaResult.push({
			name: 'video:duration',
			content: meta.videoEpisode.duration.toString(),
		})
	}
	if (meta.videoEpisode.releaseDate) {
		metaResult.push({
			name: 'video:release_date',
			content: meta.videoEpisode.releaseDate,
		})
	}
	if (meta.videoEpisode.tag) {
		meta.videoEpisode.tag.forEach(({ tag }) => {
			metaResult.push({
				name: 'video:tag',
				content: tag,
			})
		})
	}
	return metaResult
}

const getTvShowMeta: MetaMapper = (meta, metaResult) => {
	if (!meta.videoTvShow) {
		return metaResult
	}

	// Mapping actor profiles
	if (meta.videoTvShow.actor) {
		meta.videoTvShow.actor.forEach((actor) => {
			if (actor.profile) {
				metaResult.push({
					name: 'video:actor',
					content: actor.profile,
				})
			}
			if (actor.firstName) {
				metaResult.push({
					name: 'profile:first_name',
					content: actor.firstName,
				})
			}
			if (actor.lastName) {
				metaResult.push({
					name: 'profile:last_name',
					content: actor.lastName,
				})
			}
			if (actor.username) {
				metaResult.push({
					name: 'profile:username',
					content: actor.username,
				})
			}
			if (actor.gender) {
				metaResult.push({
					name: 'profile:gender',
					content: actor.gender,
				})
			}
			if (actor.role) {
				metaResult.push({
					name: 'video:actor:role',
					content: actor.role,
				})
			}
		})
	}

	// Mapping director profiles
	if (meta.videoTvShow.director) {
		meta.videoTvShow.director.forEach((director) => {
			if (director.profile) {
				metaResult.push({
					name: 'video:director',
					content: director.profile,
				})
			}
			if (director.firstName) {
				metaResult.push({
					name: 'profile:first_name',
					content: director.firstName,
				})
			}
			if (director.lastName) {
				metaResult.push({
					name: 'profile:last_name',
					content: director.lastName,
				})
			}
			if (director.username) {
				metaResult.push({
					name: 'profile:username',
					content: director.username,
				})
			}
			if (director.gender) {
				metaResult.push({
					name: 'profile:gender',
					content: director.gender,
				})
			}
		})
	}

	// Mapping writer profiles
	if (meta.videoTvShow.writer) {
		meta.videoTvShow.writer.forEach((writer) => {
			if (writer.profile) {
				metaResult.push({
					name: 'video:writer',
					content: writer.profile,
				})
			}
			if (writer.firstName) {
				metaResult.push({
					name: 'profile:first_name',
					content: writer.firstName,
				})
			}
			if (writer.lastName) {
				metaResult.push({
					name: 'profile:last_name',
					content: writer.lastName,
				})
			}
			if (writer.username) {
				metaResult.push({
					name: 'profile:username',
					content: writer.username,
				})
			}
			if (writer.gender) {
				metaResult.push({
					name: 'profile:gender',
					content: writer.gender,
				})
			}
		})
	}

	if (meta.videoTvShow.duration) {
		metaResult.push({
			name: 'video:duration',
			content: meta.videoTvShow.duration.toString(),
		})
	}

	if (meta.videoTvShow.releaseDate) {
		metaResult.push({
			name: 'video:release_date',
			content: meta.videoTvShow.releaseDate,
		})
	}

	// Mapping tag fields
	if (meta.videoTvShow.tag) {
		meta.videoTvShow.tag.forEach(({ tag }) => {
			metaResult.push({
				name: 'video:tag',
				content: tag,
			})
		})
	}

	return metaResult
}

export const formatOgTypeMeta = (
	meta?: Meta,
	metaResult: MetaResult = [],
): MetaResult => {
	if (!meta) {
		metaResult.push({ name: 'og:type', content: 'website' })
		return metaResult
	}
	switch (meta.type) {
		case 'website':
			metaResult.push({ name: 'og:type', content: 'website' })
			return metaResult
		case 'profile':
			metaResult.push({ name: 'og:type', content: 'profile' })
			return getProfileMeta(meta, metaResult)
		case 'article':
			metaResult.push({ name: 'og:type', content: 'article' })
			return getArticleMeta(meta, metaResult)
		case 'video.other':
			metaResult.push({ name: 'og:type', content: 'video.other' })
			return getOtherVideoMeta(meta, metaResult)
		case 'video.episode':
			metaResult.push({ name: 'og:type', content: 'video:episode' })
			return getEpisodeMeta(meta, metaResult)
		case 'book':
			metaResult.push({ name: 'og:type', content: 'book' })
			return getBookMeta(meta, metaResult)
		case 'video.movie':
			metaResult.push({ name: 'og:type', content: 'video.movie' })
			return getMovieMeta(meta, metaResult)
		case 'video.tv_show':
			metaResult.push({ name: 'og:type', content: 'video.tv_show' })
			return getTvShowMeta(meta, metaResult)
		default:
			metaResult.push({ name: 'og:type', content: 'website' })
			return metaResult
	}
}

export const getRootMeta = (url: string, siteInfo?: SiteInfo) => {
	const rootMeta: ServerRuntimeMetaDescriptor[] = []

	rootMeta.push(
		...[
			{ name: 'og:type', content: 'website' },
			{ name: 'og:url', content: url },
		],
	)

	if (siteInfo) {
		rootMeta.push(
			...[
				{ title: siteInfo.meta.title },
				{
					name: 'description',
					content: siteInfo.meta.description,
				},
				{ name: 'twitter:title', content: siteInfo.meta.title },
				{
					name: 'twitter:description',
					content: siteInfo.meta.description,
				},
				{ name: 'og:title', content: siteInfo.meta.title },
				{
					name: 'og:description',
					content: siteInfo.meta.description,
				},
			],
		)
	}

	if (siteInfo?.meta.ogImage) {
		rootMeta.push(
			...[
				{ name: 'og:image', content: siteInfo.meta.ogImage },
				{
					name: 'twitter:image',
					content: siteInfo.meta.ogImage,
				},
			],
		)
	}

	return rootMeta
}

export const optimizeOgImage = (ogImage?: string) => {
	return ogImage
		? imagorService
				.resize(1200, 630)
				.smartCrop(true)
				.setImagePath(ogImage)
				.filter('format(jpeg)')
				.filter('quality(60)')
				.buildUrl()
		: undefined
}
