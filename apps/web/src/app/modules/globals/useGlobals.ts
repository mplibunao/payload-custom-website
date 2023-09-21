import { type loader as rootLoader } from '~/app/root.tsx'
import { useRouteLoaderDataTyped } from '~/app/utils/misc'

/**
 * @returns the site info from the root loader
 */
export function useSiteInfo() {
	const data = useRouteLoaderDataTyped<typeof rootLoader>('root')
	return data.siteInfo
}
