/* eslint-disable max-statements */

import { type V2_ServerRuntimeMetaDescriptor } from '@remix-run/server-runtime'
import { type Page } from '~/cms/payload-types'

import {
	getResponsiveSizes,
	getResponsiveSrcSet,
	imagePrefix,
} from '../Blocks/Media'
import {
	fullGutterMediaSources,
	contentLeftOfMediaSources,
} from './responsiveHeroSources'

type HeroProps = Pick<Page, 'heroType' | 'heroMedia'>

export const preloadHeroMedia = (
	accept: string | null,
	hero: HeroProps,
): V2_ServerRuntimeMetaDescriptor | null => {
	if (typeof hero.heroMedia === 'string') return null
	const sizes = hero.heroMedia.sizes
	if (!sizes) return null

	const supportsAvif = accept?.includes('avif')
	const supportsWebP = accept?.includes('webp')

	if (hero.heroType === 'contentAboveMedia') {
		if (supportsAvif) {
			const sources = fullGutterMediaSources.find(
				(source) => source.type === 'image/avif',
			)
			if (!sources) return null

			return {
				tagName: 'link',
				rel: 'preload',
				as: 'image',
				imageSrcSet: getResponsiveSrcSet(sources.srcSet, sizes, hero.heroMedia),
				sizes: getResponsiveSizes(sources.sizes),
				href: `${imagePrefix}${sizes['original-avif']?.filename as string}`,
			}
		} else if (supportsWebP) {
			const sources = fullGutterMediaSources.find(
				(source) => source.type === 'image/webp',
			)
			if (!sources) return null

			return {
				tagName: 'link',
				rel: 'preload',
				as: 'image',
				imageSrcSet: getResponsiveSrcSet(sources.srcSet, sizes, hero.heroMedia),
				sizes: getResponsiveSizes(sources.sizes),
				href: `${imagePrefix}${sizes['original-webp']?.filename as string}`,
			}
		} else {
			const sources = fullGutterMediaSources.find((source) => !source.type)
			if (!sources) return null

			return {
				tagName: 'link',
				rel: 'preload',
				as: 'image',
				imageSrcSet: getResponsiveSrcSet(sources.srcSet, sizes, hero.heroMedia),
				sizes: getResponsiveSizes(sources.sizes),
				href: `${imagePrefix}${hero.heroMedia.filename as string}`,
			}
		}
	} else if (hero.heroType === 'contentLeftOfMedia') {
		if (supportsAvif) {
			const sources = contentLeftOfMediaSources.find(
				(source) => source.type === 'image/avif',
			)
			if (!sources) return null

			return {
				tagName: 'link',
				rel: 'preload',
				as: 'image',
				imageSrcSet: getResponsiveSrcSet(sources.srcSet, sizes, hero.heroMedia),
				sizes: getResponsiveSizes(sources.sizes),
				href: `${imagePrefix}${sizes['original-avif']?.filename as string}`,
			}
		} else if (supportsWebP) {
			const sources = contentLeftOfMediaSources.find(
				(source) => source.type === 'image/webp',
			)
			if (!sources) return null

			return {
				tagName: 'link',
				rel: 'preload',
				as: 'image',
				imageSrcSet: getResponsiveSrcSet(sources.srcSet, sizes, hero.heroMedia),
				sizes: getResponsiveSizes(sources.sizes),
				href: `${imagePrefix}${sizes['original-webp']?.filename as string}`,
			}
		} else {
			const sources = contentLeftOfMediaSources.find((source) => !source.type)
			if (!sources) return null

			return {
				tagName: 'link',
				rel: 'preload',
				as: 'image',
				imageSrcSet: getResponsiveSrcSet(sources.srcSet, sizes, hero.heroMedia),
				sizes: getResponsiveSizes(sources.sizes),
				href: `${imagePrefix}${hero.heroMedia.filename as string}`,
			}
		}
	}

	return null
}
