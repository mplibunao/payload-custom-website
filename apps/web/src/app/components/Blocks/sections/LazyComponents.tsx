import React from 'react'

export const ContentBlock = React.lazy(() =>
	import('./Content').then((module) => ({ default: module.Content })),
)
export const MediaBlock = React.lazy(() =>
	import('./MediaBlock').then((module) => ({ default: module.MediaBlock })),
)
export const CTABlock = React.lazy(() =>
	import('./CallToAction').then((module) => ({ default: module.CallToAction })),
)
export const CTAGridBlock = React.lazy(() =>
	import('./CTAGrid').then((module) => ({ default: module.CTAGrid })),
)
