import { type ResponsiveImageConfig } from '../Blocks/Media'

export const fullGutterMediaSources: ResponsiveImageConfig = {
	srcSizes: [
		'100vw',
		'media(min-width: 1280px) 80vw',
		'media(min-width: 1920px) 70vw',
	],
}
