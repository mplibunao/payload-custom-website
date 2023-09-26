import { type Page } from '~/cms/payload-types'

import {
	ContentAboveMediaPageHero,
	ContentLeftOfMediaPageHero,
	FallbackHero,
	MinimalPageHero,
} from './PageHero'

export type PageHeroProps = Pick<
	Page,
	'title' | 'heroType' | 'heroContent' | 'heroMedia'
>

export const PageHero = (props: PageHeroProps): JSX.Element => {
	switch (props.heroType) {
		case 'contentAboveMedia':
			return (
				<ContentAboveMediaPageHero
					heroContent={props.heroContent}
					heroMedia={props.heroMedia}
				/>
			)
		case 'contentLeftOfMedia':
			return (
				<ContentLeftOfMediaPageHero
					heroContent={props.heroContent}
					heroMedia={props.heroMedia}
					title={props.title}
				/>
			)
		case 'minimal':
			return (
				<MinimalPageHero heroContent={props.heroContent} title={props.title} />
			)
		default:
			return <FallbackHero heroContent={props.heroContent} />
	}
}
