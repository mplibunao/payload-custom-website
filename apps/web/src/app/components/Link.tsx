import { Link } from '@remix-run/react'
import { type PageLink } from '~/cms/payload-types'

export interface SiteLinkProps extends PageLink {
	className?: string
	children?: React.ReactNode
}

export const SiteLink = ({
	type,
	reference,
	url,
	className,
	children,
	newTab,
}: SiteLinkProps): JSX.Element => {
	const isRelativeURL = url?.indexOf('/') === 0

	const props: Record<string, string | undefined> = { className }
	if (newTab) {
		props.rel = 'noopener noreferrer'
		props.target = '_blank'
	}

	if (type === 'reference' || isRelativeURL) {
		const linkUrl =
			type === 'reference' && typeof reference.value !== 'string'
				? reference.value.slug
				: url
		return (
			<Link to={linkUrl} {...props}>
				{children}
			</Link>
		)
	}

	return (
		<a href={url} {...props}>
			{children}
		</a>
	)
}
