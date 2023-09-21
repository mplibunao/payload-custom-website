import { type CTAGridBlockType } from '~/cms/payload-types'

import { BackgroundColor } from '../../BackgroundColor'
import { Icon } from '../../Icon/Icon'
import { Grid, Gutter } from '../../Layout'
import { SiteLink } from '../../SiteLink'
import { Separator } from '../../ui/separator'

export const CTAGridBlock = ({ actions }: CTAGridBlockType): JSX.Element => {
	return (
		<div>
			<ul className='p-0 m-0'>
				{actions.map(({ headline, link, icon, id }, i) => (
					<li key={id ?? i} className='group'>
						<SiteLink
							{...link}
							className='flex flex-row items-center text-antique relative'
							prefetch='viewport'
						>
							<div className='container z-10'>
								<Grid className='gap-0'>
									<div className='col-span-12'>
										<div className='flex py-12 px-0 flex-col items-start sm:flex-row sm:items-center'>
											<p className='h4 text-antique flex-grow mr-9'>
												{headline}
											</p>

											<p className='h5 m-0 flex items-center'>
												{link.label}
												{icon === 'arrow' && (
													<Icon
														id='arrow'
														className='ml-6 max-w-[30px] md:max-w-[40px] transition-transform duration-300 h-auto translate-x-2 translate-y-0'
													/>
												)}
											</p>

											{i + 1 !== actions.length ? (
												<Separator className='bg-antique absolute left-0 right-0 bottom-0' />
											) : null}
										</div>
									</div>
								</Grid>
							</div>

							<Gutter className='absolute h-full w-full' left>
								<BackgroundColor
									color='gray'
									className='h-full w-full overflow-hidden relative transition duration-300 ease-in-out opacity-9'
								/>
							</Gutter>
						</SiteLink>
					</li>
				))}
			</ul>
		</div>
	)
}
