import {
	type SocialMedia,
	type Footer as FooterType,
} from '~/cms/payload-types'

import { Grid, Gutter } from './Layout'
import { LetsTalk } from './LetsTalk'
import { SiteLink } from './SiteLink'

export interface FooterProps {
	footer?: Pick<FooterType, 'id' | 'nav'>
	socialMedia: NonNullable<SocialMedia['links']>
}

type Link = {
	href: string
	label: React.ReactNode
	type: string
}

const links: Link[] = [
	{
		href: 'mailto:markpaololibunao@gmail.com',
		label: 'markpaololibunao@gmail.com',
		type: 'email',
	},
	{
		href: 'https://www.google.com/maps',
		label: (
			<span>
				Taft Avenue, Malate Manila, Philippines
				<br />
				Florida Street, Rocka Executive Village, Burol 1st, Bulacan, Philippines
			</span>
		),
		type: 'address',
	},
	{ href: 'tel:+639567494261', label: '+639567494261', type: 'tel' },
]

export const Footer = ({ footer, socialMedia }: FooterProps): JSX.Element => {
	return (
		<footer className='mt-36 relative overflow-hidden'>
			<Gutter right className='absolute top-0 right-0 bottom-0 left-0'>
				<div className='bg-gray h-full' />
			</Gutter>

			<div className='container pt-36 pb-0 md:pb-32 relative'>
				<Grid>
					{footer && Array.isArray(footer.nav) && footer.nav.length > 0 ? (
						<ul className='col-span-8 md:col-span-6'>
							{footer.nav.map(({ link, id }, i) => (
								<li key={id ?? i}>
									<SiteLink
										{...link}
										prefetch='viewport'
										className='text-antique hover:text-blue hover:transition-all hover:duration-300 ease-linear'
									>
										{link.label}
									</SiteLink>
								</li>
							))}
						</ul>
					) : undefined}

					<div className='col-span-8 md:col-span-6'>
						{links.map((link) => (
							<div className='mb-9' key={link.type}>
								<p className='m-0'>
									<a
										href={link.href}
										className='text-antique hover:text-blue hover:transition-all hover:duration-300 ease-linear'
										target='_blank'
										rel='noopener noreferrer'
									>
										{link.label}
									</a>
								</p>
							</div>
						))}

						<ul className='p-0 my-16 mx-0'>
							{socialMedia.map(({ id, label, url }, i) => (
								<li key={id ?? i}>
									<a
										href={url}
										target='_blank'
										rel='noopener noreferrer'
										className='hover:transition-all hover:duration-300 hover:ease-linear hover:text-blue text-antique'
									>
										{label}
									</a>
								</li>
							))}
						</ul>

						<p className='text-antique'>
							&copy; {new Date().getFullYear()} Metrics Structures
						</p>
					</div>
				</Grid>

				<div className='relative -left-24 -bottom-8 -mb-12 md:-left-20 md:-bottom-12 xl:-left-28 xl:-bottom-32 xl:absolute'>
					<LetsTalk location='footer' />
				</div>
			</div>
		</footer>
	)
}
