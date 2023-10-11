import { type loader as pageLoader } from '../modules/page/_page.$.route'
import { useRouteLoaderDataTyped } from './misc'

/**
 * @returns the page info from the root loader
 */
export function usePage() {
	const data = useRouteLoaderDataTyped<typeof pageLoader>('_page.$')
	return data.page
}
