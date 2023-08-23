// @ts-ignore
import React from 'react'
import { type SVGProps } from 'react'

import href from './sprite.svg'
import { type IconId } from './types'

export type IconProps = SVGProps<SVGSVGElement> & {
	id: IconId
	label?: string
	hidden?: boolean
}

export const Icon = ({
	id,
	label,
	hidden,
	...props
}: IconProps): JSX.Element => {
	const hideIcon = isHidden({ hidden, label, role: props.role })
	return (
		<>
			<svg aria-hidden={hideIcon} focusable={!hideIcon} {...props}>
				<use href={`${href}#${id}`} />
			</svg>
			{label ? <span className='sr-only'>{label}</span> : null}
		</>
	)
}

function isHidden({
	hidden,
	label,
	role,
}: Pick<IconProps, 'hidden' | 'label' | 'role'>) {
	// hidden should take precedence over label since an icon can be visible but have no label (eg. have sibling elements that announce purpose)
	if (hidden) {
		return true
	}
	// role=img means standalone so don't hide it even if it has label
	if (role === 'img') {
		return false
	}
	if (label) {
		return true
	}
	return false
}
