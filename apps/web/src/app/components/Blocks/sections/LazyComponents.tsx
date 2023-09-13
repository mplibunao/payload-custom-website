import React from 'react'

export const ContentBlock = React.lazy(() =>
	import('./ContentBlock').then((module) => ({ default: module.ContentBlock })),
)
export const MediaBlock = React.lazy(() =>
	import('./MediaBlock').then((module) => ({ default: module.MediaBlock })),
)
export const CTABlock = React.lazy(() =>
	import('./CallToActionBlock').then((module) => ({
		default: module.CallToActionBlock,
	})),
)
export const CTAGridBlock = React.lazy(() =>
	import('./CTAGridBlock').then((module) => ({ default: module.CTAGridBlock })),
)
)
