import { cssBundleHref } from '@remix-run/css-bundle'
import {
	type LinksFunction,
	type V2_MetaFunction,
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
import { type V2_ServerRuntimeMetaDescriptor } from '@remix-run/server-runtime'
import {
	FOOTER_KEY,
	MEGA_MENU_KEY,
	SOCIAL_MEDIA_KEY,
} from '~/constants/globalsCacheKeys.ts'

import { Header } from './components/Header.tsx'
import svgSprite from './components/Icon/sprite.svg'
import { GeneralErrorBoundary } from './components/error-boundary.tsx'
import { type SiteInfo } from './modules/site/site.service.server.ts'
import fontStylestylesheetUrl from './styles/font.css'
import tailwindStylesheetUrl from './styles/tailwind.css'

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
		rootLinks.push({ rel: 'preload', href: cssBundleHref, as: 'style' })
		rootLinks.push({ rel: 'stylesheet', href: cssBundleHref })
	}

	return rootLinks
}

export const loader = async ({ context, request }: DataFunctionArgs) => {
	const { payload, cacheService } = context

	const [megaMenuData, footer, socialMediaData, siteInfoData] =
		await Promise.allSettled([
			cacheService.exec(
				() => payload.findGlobal({ slug: 'mega-menu' }),
				[MEGA_MENU_KEY],
			),
			cacheService.exec(
				() => payload.findGlobal({ slug: 'footer' }),
				[FOOTER_KEY],
			),
			cacheService.exec(
				() => payload.findGlobal({ slug: 'social-media' }),
				[SOCIAL_MEDIA_KEY],
			),
			context.siteService.getSiteInfo(),
		])

	const siteInfo =
		siteInfoData.status === 'fulfilled' ? siteInfoData.value : undefined
	const socialMedia =
		(socialMediaData.status === 'fulfilled' && socialMediaData.value?.links) ||
		[]
	const megaMenu =
		megaMenuData.status === 'fulfilled' ? megaMenuData.value : undefined

	return json({
		siteInfo,
		requestInfo: {
			path: new URL(request.url).pathname,
		},
		url: request.url,
		megaMenu,
		footer,
		socialMedia,
	})
}

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
	const rootMeta: V2_ServerRuntimeMetaDescriptor[] = [
		{ name: 'og:type', content: 'website' },
	]
	if (!data) return rootMeta

	rootMeta.push({ name: 'og:url', content: data.url })

	if (data.siteInfo) {
		rootMeta.push({ title: data.siteInfo.meta.title })
		rootMeta.push({
			name: 'description',
			content: data.siteInfo.meta.description,
		})
		rootMeta.push({ name: 'twitter:title', content: data.siteInfo.meta.title })
		rootMeta.push({
			name: 'twitter:description',
			content: data.siteInfo.meta.description,
		})
		rootMeta.push({ name: 'og:title', content: data.siteInfo.meta.title })
		rootMeta.push({
			name: 'og:description',
			content: data.siteInfo.meta.description,
		})
	}

	if (data?.siteInfo?.meta.ogImage) {
		rootMeta.push({ name: 'og:image', content: data.siteInfo.meta.ogImage })
		rootMeta.push({
			name: 'twitter:image',
			content: data.siteInfo.meta.ogImage,
		})
	}

	return rootMeta
}

function Document({
	children,
	siteInfo,
}: {
	children: React.ReactNode
	siteInfo?: SiteInfo
}) {
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
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}

export default function App() {
	const data = useLoaderData<typeof loader>()
	return (
		<Document siteInfo={data.siteInfo ?? undefined}>
			<div className='flex h-screen flex-col justify-between'>
				<div className='flex-1'>
					<Header socialMedia={data.socialMedia} megaMenu={data.megaMenu} />
					<div className='pt-[10rem]'>
						<Outlet />
					</div>
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
