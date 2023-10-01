/*
 * The idea here is to emit "early hints" in the response based on the CSS files or other assets needed by the route
 *
 * Eg for a route with 3 css files we want to emit at the top of the response:
 *
 * HTTP/1.1 103 Early Hints
 * Link: </build/_assets/app-XX4AKNF6.css>; rel=preload; as=style;
 * Link: </build/_assets/react-notion-x-5KGZZXWT.css>; rel=preload; as=style;
 * Link: </build/_assets/prism-coy-3Y5Y6EPU.css>; rel=preload; as=style;
 */

import { type LinkDescriptor, type ServerBuild } from '@remix-run/node'
import { matchServerRoutes } from '@remix-run/server-runtime/dist/routeMatching'
import { createRoutes } from '@remix-run/server-runtime/dist/routes'
import { type Response } from 'express'
import { type ExpressMiddleware } from '~/types/middlewareType'

type EarlyHintAs = 'document' | 'script' | 'image' | 'style' | 'font'
type EarlyHintCORS = 'anonymous' | 'use-credentials' | 'crossorigin'
type EarlyHintRel =
	| 'dns-prefetch'
	| 'preconnect'
	| 'prefetch'
	| 'preload'
	| 'prerender'

export interface EarlyHintItem {
	href: string
	rel: EarlyHintRel
	cors?: boolean | EarlyHintCORS
	as?: EarlyHintAs
}

export const remixEarlyHints = (build: ServerBuild): ExpressMiddleware => {
	const routes = createRoutes(build.routes)

	return (req, res, next) => {
		// Find the routes that match
		const matches = matchServerRoutes(routes, req.path)

		// For those routes, run their links() functions and find their links
		const matchesLinks: LinkDescriptor[] = (matches ?? []).flatMap((match) => {
			const { links } = match.route.module
			return links ? links() : []
		})

		// Filter down to stylesheets and emit css resources
		const cssResources = matchesLinks.flatMap((link) => {
			if ('href' in link && link.rel === 'stylesheet' && link.href) {
				return [
					{
						rel: 'preload',
						as: 'style',
						href: link.href,
					},
				] satisfies EarlyHintItem[]
			}
			return []
		})

		// you can add custom hints like preconnect to hosts
		writeEarlyHintsLinks(cssResources, res)

		next()
	}
}

function writeEarlyHintsLinks(earlyHints: EarlyHintItem[], res: Response) {
	const hints = earlyHints.map((earlyHint) => formatEntry(earlyHint))

	res.writeEarlyHints({ link: hints })
}

const formatEntry = (earlyHint: EarlyHintItem, nodeApi = true) => {
	const { href, rel, as = '', cors = false } = earlyHint

	let _cors
	switch (cors) {
		case true:
		case 'crossorigin':
			_cors = 'crossorigin'
			break
		case 'anonymous':
			_cors = 'crossorigin=anonymous'
			break
		case 'use-credentials':
			_cors = 'crossorigin=use-credentials'
			break
		case false:
			_cors = ''
			break
		default:
			_cors = ''
			break
	}

	if (nodeApi) {
		return `<${href}>; rel=${rel}${as.length !== 0 ? '; as=' : ''}${as}${
			_cors.length !== 0 ? '; ' : ''
		}${_cors}`
	}

	return `Link: <${href}>; rel=${rel}${as.length !== 0 ? '; as=' : ''}${as}${
		_cors.length !== 0 ? '; ' : ''
	}${_cors}`
}
