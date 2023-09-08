import { type loader as pageLoader } from '../modules/page/_page.$slug.route'
import { useRouteLoaderDataTyped } from './misc'

/**
 * @returns the page info from the root loader
 */
export function usePage() {
	const data = useRouteLoaderDataTyped<typeof pageLoader>('_page.$slug')
	return data.page
}
