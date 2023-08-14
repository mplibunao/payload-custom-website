import React from 'react'
import { Icon } from '~/app/components/Icon/Icon'

export const BackButton: React.FC = () => {
	return (
		<>
			<div className='side-menu'>
				<a className='side-menu-nested' href='/home'>
					<Icon id='chevron-left' className='w-5 h-5' />
					<span>Back</span>
				</a>
			</div>
		</>
	)
}
