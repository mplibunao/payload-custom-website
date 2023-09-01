import React from 'react'

export const ContentBlock = React.lazy(() =>
	import('./Content').then((module) => ({ default: module.Content })),
)
export const MediaBlock = React.lazy(() =>
	import('./MediaBlock').then((module) => ({ default: module.MediaBlock })),
)
