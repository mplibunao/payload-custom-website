import { cssBundleHref } from '@remix-run/css-bundle'
import {
	type LinksFunction,
	type MetaFunction,
	type DataFunctionArgs,
	json,
} from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from '@remix-run/react'
import { CACHE_STANDARD } from '~/server/infra/cache.server.ts'

import { Footer } from './components/Footer.tsx'
import { Header } from './components/Header.tsx'
import svgSprite from './components/Icon/sprite.svg'
import { ScrollToTop } from './components/ScrollToTop.tsx'
import { GeneralErrorBoundary } from './components/error-boundary.tsx'
import {
	getFooter,
	getMegaMenu,
	getSocialMedia,
} from './modules/globals/globals.service.server.ts'
import { type SiteInfo } from './modules/globals/site.service.server.ts'
import fontStylestylesheetUrl from './styles/font.css'
import tailwindStylesheetUrl from './styles/tailwind.css'
import { useIsBot } from './utils/isBotProvider.tsx'
import { isRejected } from './utils/misc.ts'
import { getRootMeta } from './utils/seo.ts'

export const links: LinksFunction = () => {
	const rootLinks = [
		// Preload svg sprite as a resource to avoid render blocking
		{ rel: 'preload', href: svgSprite, as: 'image' },
		// Preload CSS as a resource to avoid render blocking
		{ rel: 'preload', href: fontStylestylesheetUrl, as: 'style' },
		{ rel: 'preload', href: tailwindStylesheetUrl, as: 'style' },
		{ rel: 'mask-icon', href: '/favicons/mask-icon.svg' },
		{ rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
		{
			rel: 'icon',
			type: 'image/svg+xml',
			href: '/favicons/favicon.svg',
			sizes: 'any',
		},
		{
			rel: 'icon',
			type: 'image/png',
			href: '/favicons/favicon-32x32.png',
			sizes: '32x32',
		},
		{
			rel: 'icon',
			type: 'image/png',
			href: '/favicons/favicon-16x16.png',
			sizes: '16x16',
		},
		{
			rel: 'apple-touch-icon',
			href: '/favicons/apple-touch-icon.png',
			sizes: '180x180',
		},
		{
			rel: 'manifest',
			href: '/site.webmanifest',
			crossOrigin: 'use-credentials',
		} as const, // necessary to make typescript happy
		{ rel: 'stylesheet', href: fontStylestylesheetUrl },
		{ rel: 'stylesheet', href: tailwindStylesheetUrl },
	]

	if (cssBundleHref) {
		rootLinks.push(
			...[
				{ rel: 'preload', href: cssBundleHref, as: 'style' },
				{ rel: 'stylesheet', href: cssBundleHref },
			],
		)
	}

	return rootLinks
}

export const loader = async ({ context, request }: DataFunctionArgs) => {
	return context.serverTiming.time('route/root#loader', async () => {
		const { logger } = context
		const results = await Promise.allSettled([
			getMegaMenu(context),
			getFooter(context),
			getSocialMedia(context),
			context.siteService.getSiteInfo(),
		])

		for (let result of results) {
			if (isRejected(result)) {
				logger.error({
					err: result.reason as unknown,
					route: 'route/root#loader',
				})
			}
		}

		const [megaMenuData, footerData, socialMediaData, siteInfoData] = results

		const siteInfo =
			siteInfoData.status === 'fulfilled' ? siteInfoData.value : undefined
		const socialMedia =
			(socialMediaData.status === 'fulfilled' &&
				socialMediaData.value?.links) ||
			[]
		const megaMenu =
			megaMenuData.status === 'rejected'
				? undefined
				: {
						id: megaMenuData.value.id,
						nav: megaMenuData.value.nav,
				  }
		const footer =
			footerData.status === 'rejected'
				? undefined
				: {
						id: footerData.value.id,
						nav: footerData.value.nav,
				  }

		return json(
			{
				siteInfo,
				megaMenu,
				footer,
				socialMedia,
				meta: getRootMeta(request.url, siteInfo),
				imagorUrl: process.env.PAYLOAD_PUBLIC_IMAGOR_URL,
			},
			{
				headers: {
					'Cache-Control': CACHE_STANDARD,
				},
			},
		)
	})
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	if (!data) return []
	return data.meta
}

function Document({
	children,
	siteInfo,
	imagorUrl,
}: {
	children: React.ReactNode
	siteInfo?: SiteInfo
	imagorUrl?: string
}) {
	const isBot = useIsBot()
	return (
		<html lang='en' className={`h-full overflow-x-hidden`}>
			<head>
				<Meta />
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width,initial-scale=1' />
				<meta name='msapplication-TileColor' content='#da532c' />
				<meta
					name='msapplication-config'
					content='/favicons/browserconfig.xml'
				/>
				<meta name='theme-color' content='#ffffff' />
				<meta
					name='apple-mobile-web-app-status-bar-style'
					content='black-translucent'
				/>

				{/* twitter card */}
				<meta name='twitter:card' content='summary_large_image' />
				{siteInfo?.meta.twitter && (
					<>
						<meta name='twitter:creator' content={siteInfo.meta.twitter} />
						<meta name='twitter:site' content={siteInfo.meta.twitter} />
					</>
				)}

				{/* facebook cards */}
				<meta property='og:site_name' content={siteInfo?.meta.title} />
				<meta property='og:locale' content='en_US' />

				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				{isBot ? null : <Scripts />}
				<script
					dangerouslySetInnerHTML={{
						__html: `window.PAYLOAD_PUBLIC_IMAGOR_URL = '${
							imagorUrl as string
						}'`,
					}}
				/>
				<LiveReload />
			</body>
		</html>
	)
}

export default function App() {
	const data = useLoaderData<typeof loader>()
	return (
		<Document siteInfo={data.siteInfo ?? undefined} imagorUrl={data.imagorUrl}>
			<div className='flex h-screen flex-col justify-between'>
				<div className='flex-1'>
					<Header socialMedia={data.socialMedia} megaMenu={data.megaMenu} />

					<div className='pt-header'>
						<Outlet />
					</div>

					<ScrollToTop />
					<Footer footer={data.footer} socialMedia={data.socialMedia} />
				</div>
			</div>
		</Document>
	)
}

export function ErrorBoundary() {
	// NOTE: you cannot use useLoaderData in an ErrorBoundary because the loader
	// likely failed to run so we have to do the best we can.
	// We could probably do better than this (it's possible the loader did run).
	// This would require a change in Remix.

	// Just make sure your root route never errors out and you'll always be able
	// to give the user a better UX.

	return (
		<Document>
			<GeneralErrorBoundary />
		</Document>
	)
}
