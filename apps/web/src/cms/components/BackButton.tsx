import React from 'react'

export const BackButton: React.FC = () => {
	return (
		<>
			<div className='side-menu'>
				<a className='side-menu-nested' href='/home'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						stroke='currentColor'
						stroke-linecap='round'
						stroke-linejoin='round'
						stroke-width='2'
						viewBox='0 0 24 24'
						className='w-5 h-5'
						aria-hidden
						focusable={false}
					>
						<path d='M15 18l-6-6 6-6' />
					</svg>
					<span>Back</span>
				</a>
			</div>
		</>
	)
}
