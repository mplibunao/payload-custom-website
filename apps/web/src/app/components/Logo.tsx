import { cva } from 'cva'
import { twMerge } from 'tailwind-merge'
import { type Logo as LogoType } from '~/cms/payload-types'

import { type SiteInfo } from '../modules/site/site.repository.server'

type BgColorVariant = Record<NonNullable<LogoType['backgroundColor']>, string>
type PaddingVariant = Record<NonNullable<LogoType['padding']>, string>

const logoStyles = cva([], {
	variants: {
		bgColor: {
			none: '',
			orange: 'bg-orange',
			black: 'bg-black',
			blue: 'bg-blue',
			gray: 'bg-gray',
			red: 'bg-red',
			yellow: 'bg-yellow',
		} satisfies BgColorVariant,
		padding: {
			none: '',
			'4px': 'p-1',
			'8px': 'p-2',
			'12px': 'p-3',
			'16px': 'p-4',
		} satisfies PaddingVariant,
	},
	defaultVariants: {
		bgColor: 'none',
		padding: 'none',
	},
})

export type LogoProps = {
	logo: SiteInfo['logo']
} & Omit<JSX.IntrinsicElements['img'], 'src' | 'alt'>

export const Logo = ({ logo, className, ...props }: LogoProps): JSX.Element => {
	if (!logo) return <></>
	if (typeof logo === 'string') {
		return <img src={logo} alt='Logo' className={className} {...props} />
	}

	return (
		<img
			src={logo.url}
			alt={logo.alt}
			className={twMerge(
				logoStyles({
					bgColor: logo.backgroundColor,
					padding: logo.padding,
					className,
				}),
			)}
			{...props}
		/>
	)
}
