import { type CTA } from '~/cms/payload-types'

import { BackgroundColor } from '../../BackgroundColor'
import { Container, Gutter } from '../../Layout'
import { SiteLink } from '../../SiteLink'
import { Button } from '../../ui/button'
import { RichText } from '../RichText'

export interface CallToActionBlockProps extends CTA {}

export const CallToActionBlock = (
	props: CallToActionBlockProps,
): JSX.Element => {
	return (
		<div className='relative'>
			<Gutter className='absolute z-10 top-0 right-0 bottom-0 left-0' right>
				<BackgroundColor
					color={props.backgroundColor.color}
					className='h-full'
				/>
			</Gutter>

			<Container className='py-60 relative z-20'>
				<BackgroundColor color={props.backgroundColor.color}>
					<RichText content={props.content} />
				</BackgroundColor>

				<ul className='flex flex-wrap list-none m-0 p-0'>
					{props.actions?.map(({ link, id }, i) => (
						<li key={id ?? i} className='flex flex-wrap list-none m-0 p-0'>
							<Button
								color={props.backgroundColor.color}
								asChild
								className='my-6 mx-0'
							>
								<SiteLink
									{...link}
									className='no-underline'
									prefetch='viewport'
								>
									{link.label}
								</SiteLink>
							</Button>
						</li>
					))}
				</ul>
			</Container>
		</div>
	)
}
