import React from 'react'

/**
 * More performant than window.innerWidth and context (w/o useMemo)
 * Eg. useMediaQuery('only screen and (min-width: 1024px)', false)
 * @param {String} query
 * @param {Boolean} serverFallback
 * @return {Boolean} Whether devices matches the media query
 */
export function useMediaQuery(query: string, serverFallback: boolean): boolean {
	const getServerSnapshot = () => serverFallback

	const subscribe = React.useCallback(
		(callback: () => void) => {
			const matchMedia = window.matchMedia(query)

			if (matchMedia.addEventListener) {
				matchMedia.addEventListener('change', callback)
			} else {
				//https://caniuse.com/?search=MediaQueryList%20inherits%20EventTarget
				matchMedia.addListener(callback)
			}
			return () => {
				matchMedia.removeEventListener('change', callback)
			}
		},
		[query],
	)

	const getSnapshot = () => {
		return window.matchMedia(query).matches
	}

	return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
