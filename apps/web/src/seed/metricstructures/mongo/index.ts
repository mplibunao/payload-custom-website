/* eslint-disable max-statements */
import closeWithGrace, { type Signals } from 'close-with-grace'
import express from 'express'
import { type Options } from 'payload/dist/globals/operations/local/update'
import { PAYLOAD_ADMIN_EMAIL, PAYLOAD_ADMIN_PASSWORD } from '~/constants'
import { initApp } from '~/server/app'
import { config } from '~/server/infra/config.server'
import { closeDBConnection } from '~/server/infra/mongo'
import { closeRedisConnection } from '~/server/infra/redis'

import { categoriesData } from './categories'
import { hancockStudyData } from './hancockStudy'
import { homePageSeedData } from './homePage'
import {
	hancockMediaData,
	homeMedia,
	schuilMediaData,
	whoWeAreMedia,
} from './media'
import { ourApproachPageData } from './ourApproach'
import { schuilStudyData } from './schuil-coffee-study'
import { whoWeArePageData } from './whoWeArePage'

if (!config.payload.local) {
	throw new Error('Must set PAYLOAD_LOCAL_API to true to seed data')
}

void seed()

async function seed() {
	const app = await initApp(express(), { config })
	console.log('Server started in standalone mode')

	// delay is the number of milliseconds for the graceful close to finish
	const delay = config.app.APP_ENV === 'production' ? 5000 : 0
	const closeListeners = closeWithGrace(
		{ delay },
		async ({
			err,
			signal,
			manual,
		}: {
			err?: Error
			signal?: Signals
			manual?: boolean
		}) => {
			if (err) {
				app.locals.logger.error(err)
			}

			app.locals.logger.info({ signal, manual }, 'closing application')

			await Promise.allSettled([
				closeDBConnection(
					app.locals.payload.globals.Model.base,
					app.locals.logger,
				),
				closeRedisConnection(app.locals.redis, app.locals.logger),
			])
			closeListeners.uninstall()
		},
	)

	/*
	 *Start seeding data
	 */
	const { payload, logger } = app.locals
	try {
		logger.info('Seeding data...')
		logger.info('Creating admin user...')
		await payload.create({
			collection: 'users',
			data: {
				email: PAYLOAD_ADMIN_EMAIL,
				password: PAYLOAD_ADMIN_PASSWORD,
			},
		})

		logger.info('Creating categories...')
		const categoryIds = await Promise.all(
			categoriesData.map((data) => payload.create(data)),
		).then((categories) => categories.map(({ id }) => id))

		logger.info('Uploading media files...')
		/*
		 *Home Media
		 */
		const { id: homeHeroMediaId } = await payload.create(homeMedia.hero)
		const { id: homeOfficeId } = await payload.create(homeMedia.office)
		const homeContentCollageMediaIds = await Promise.all(
			homeMedia.contentCollage.map((media) => payload.create(media)),
		).then((results) => results.map((result) => result.id))

		/*
		 *Who we are media
		 */
		const { id: whoWeAreHeroMediaId } = await payload.create(whoWeAreMedia.hero)
		const { id: whoWeAreConstructionTripodMediaId } = await payload.create(
			whoWeAreMedia.constructionTripod,
		)
		const whoWeAreContentCollageMediaIds = homeContentCollageMediaIds
			.filter((_, i) => [3, 4].includes(i))
			.concat([whoWeAreConstructionTripodMediaId])
		const { id: whoWeAreTeamLunchMediaId } = await payload.create(
			whoWeAreMedia.teamLunch,
		)
		const whoWeAreMediaGridIds = await Promise.all(
			whoWeAreMedia.mediaGrid.map((media) => payload.create(media)),
		).then((results) => results.map((result) => result.id))
		const whoWeAreMediaSlidesIds = await Promise.all(
			whoWeAreMedia.slides.map((media) => payload.create(media)),
		).then((results) =>
			results
				.map((result) => result.id)
				.concat([homeContentCollageMediaIds[1] as string]),
		)

		/*
		 *Schuil Study Media
		 */
		const [
			schuilExteriorMedia,
			schuilInteriorMedia1,
			schuilInteriorMedia2,
			schuilCollage1,
			schuilCollage2,
			schuilCollage3,
		] = await Promise.all(
			schuilMediaData.map((data) => payload.create(data)),
		).then((res) => res.map(({ id }) => id))
		if (
			!schuilExteriorMedia ||
			!schuilInteriorMedia1 ||
			!schuilInteriorMedia2 ||
			!schuilCollage1 ||
			!schuilCollage2 ||
			!schuilCollage3
		) {
			throw new Error('Error uploading case study media')
		}

		/*
		 * Hancock Study Media
		 */
		const [
			hancockPlantWallMedia1,
			hancockPlantWallMedia2,
			hancockPlantWallMedia3,
			hancockTables1,
			hancockTables2,
			hancockTables3,
		] = await Promise.all(
			hancockMediaData.map((data) => payload.create(data)),
		).then((res) => res.map(({ id }) => id))
		if (
			!hancockPlantWallMedia1 ||
			!hancockPlantWallMedia2 ||
			!hancockPlantWallMedia3 ||
			!hancockTables1 ||
			!hancockTables2 ||
			!hancockTables3
		) {
			throw new Error('Error uploading case study media')
		}

		logger.info('Updating globals...')
		await payload.updateGlobal({
			slug: 'social-media',
			data: {
				links: [
					{
						label: 'Linkedin',
						url: 'https://www.linkedin.com/in/mark-paolo-libunao-201166141/',
					},
					{
						label: 'Facebook',
						url: 'https://www.facebook.com/mplibunao/',
					},
					{
						label: 'Twitter',
						url: 'https://twitter.com/mpradorbrandy',
					},
					{
						label: 'Instagram',
						url: 'https://www.instagram.com/mpradorbrandy/',
					},
				],
			},
		})

		await payload.updateGlobal({
			slug: 'site',
			data: {
				meta: {
					title: 'Metric Structures',
					description:
						'We bring together dreamers, thinkers and makers. Metric Structures is Michigan-based construction company dedicated to turning your visions into reality. From residential renovations to commercial construction, our expert team brings craftsmanship, precision, and decades of local experience to every project. Explore our portfolio and start building with confidence today.',
					twitter: '@mpradorbrandy',
					ogImage: homeHeroMediaId,
				},
			},
		})

		logger.info('Creating case studies...')
		const { id: schuilStudyId } = await payload.create(
			schuilStudyData({
				categoryIds,
				exteriorMediaId: schuilExteriorMedia,
				interiorMediaIds: [schuilInteriorMedia1, schuilInteriorMedia2],
				mediaCollageIds: [schuilCollage1, schuilCollage2, schuilCollage3],
			}),
		)

		const { id: hancockStudyId } = await payload.create(
			hancockStudyData({
				categoryIds,
				plantWallMedia: [
					hancockPlantWallMedia1,
					hancockPlantWallMedia2,
					hancockPlantWallMedia3,
				],
				tableMedia: [hancockTables1, hancockTables2, hancockTables3],
			}),
		)

		logger.info('Creating pages...')
		const { id: whoWeArePageId } = await payload.create(
			whoWeArePageData({
				heroMedia: whoWeAreHeroMediaId,
				contentCollageMediaIds: whoWeAreContentCollageMediaIds,
				mediaGridIds: whoWeAreMediaGridIds,
				teamLunchMedia: whoWeAreTeamLunchMediaId,
				slideMediaIds: whoWeAreMediaSlidesIds,
			}),
		)

		await payload.create(
			homePageSeedData({
				heroMedia: homeHeroMediaId,
				officeMedia: homeOfficeId,
				contentCollageMediaIds: homeContentCollageMediaIds,
				whoWeArePageId,
				studiesId: [hancockStudyId, schuilStudyId],
			}),
		)

		const { id: ourApproachPageId } = await payload.create(
			ourApproachPageData({
				mediaStatCollageMediaIds: homeContentCollageMediaIds.filter((_, i) =>
					[1, 2, 3, 4].includes(i),
				),
			}),
		)

		const nav: Options<'footer'>['data']['nav'] = [
			{
				link: {
					type: 'reference',
					reference: {
						relationTo: 'pages',
						value: ourApproachPageId,
					},
					label: 'Our Approach',
					appearance: 'default',
					url: '',
				},
			},
			{
				link: {
					type: 'reference',
					reference: {
						relationTo: 'pages',
						value: whoWeArePageId,
					},
					label: 'Who We Are',
					appearance: 'default',
					url: '',
				},
			},
			{
				link: {
					type: 'custom',
					label: 'Case Studies',
					reference: {
						relationTo: 'pages',
						value: '',
					},
					appearance: 'default',
					url: '/studies',
				},
			},
			{
				link: {
					type: 'custom',
					label: 'Contact',
					reference: {
						relationTo: 'pages',
						value: '',
					},
					appearance: 'default',
					url: '/contact',
				},
			},
		]

		logger.info('Creating mega menu and footer...')
		await payload.updateGlobal({
			slug: 'mega-menu',
			data: {
				nav,
			},
		})

		await payload.updateGlobal({
			slug: 'footer',
			data: {
				nav,
			},
		})

		logger.info('Successfully ran seed script')
		process.exit(0)
	} catch (error) {
		logger.error(error, 'error')
		process.exit(1)
	}
}
