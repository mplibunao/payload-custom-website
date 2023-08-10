import { type loader as pageLoader } from '../routes/_page.$slug'
import { useRouteLoaderDataTyped } from './misc'

/**
 * @returns the page info from the root loader
 */
export function usePage() {
	const data = useRouteLoaderDataTyped<typeof pageLoader>('routes/_page.$slug')
	return data.page
}
