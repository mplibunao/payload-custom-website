import { type ResponsiveImageConfig } from '../Blocks/Media'

export const fullGutterMediaSources: ResponsiveImageConfig = {
	srcSizes: [
		'100vw',
		'media(min-width: 1280px) 80vw',
		'media(min-width: 1920px) 70vw',
	],
	srcBreakpoints: [480, 640, 768, 1024, 1280, 1536, 1920, 2560],
}

export const contentLeftOfMediaSources: ResponsiveImageConfig = {
	srcSizes: ['50vw'],
	srcBreakpoints: [768, 1024, 1280, 1536, 1920],
}
