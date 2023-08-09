import { type loader as rootLoader } from '~/app/root.tsx'

import { useRouteLoaderDataTyped } from './misc'

/**
 * @returns the request info from the root loader
 */
export function useRequestInfo() {
	const data = useRouteLoaderDataTyped<typeof rootLoader>('root')
	return data.requestInfo
}
