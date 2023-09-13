import { cva } from 'cva'
import { type ContentBlockType } from '~/cms/payload-types'

import { BackgroundColor } from '../../BackgroundColor'
import { Container, Grid, Gutter } from '../../Layout'
import { Padding } from '../../Padding'
import { RichText } from '../RichText'

type Alignment = Record<
	NonNullable<ContentBlockType['accentLineAlignment']>,
	string
>
const accentLineStyles = cva(
	['bg-gray absolute top-6 pointer-events-none w-screen h-1 '],
	{
		variants: {
			alignment: {
				left: 'right-full',
				right: 'left-full',
			} satisfies Alignment,
		},
	},
)
type Column = ContentBlockType['columns'][number]
const richTextCellStyles = cva(['col-span-8'], {
	variants: {
		alignment: {
			left: '',
			center: 'text-center [&_p]:mx-auto',
			right: 'text-right',
		} satisfies Record<Column['alignment'], string>,
		width: {
			oneThird: 'lg:col-span-3',
			half: 'lg:col-span-6',
			twoThirds: 'lg:col-span-9',
			full: 'lg:col-span-12',
		} satisfies Record<Column['width'], string>,
	},
	compoundVariants: [
		{
			alignment: 'right',
			width: 'oneThird',
			class: 'lg:col-start-9',
		},
		{
			alignment: 'right',
			width: 'half',
			class: 'lg:col-start-6',
		},
		{
			alignment: 'right',
			width: 'twoThirds',
			class: 'lg:col-start-3',
		},
	],
})

export const ContentBlock = (props: ContentBlockType) => {
	return (
		<div className='overflow-hidden'>
			<Gutter left right>
				<BackgroundColor color={props.backgroundColor.color}>
					<Padding top={props.paddingTop} bottom={props.paddingBottom}>
						<Container className='relative'>
							{props.accentLine ? (
								<div
									className={accentLineStyles({
										alignment: props.accentLineAlignment,
									})}
								/>
							) : null}

							<Grid>
								{props.columns.map((col, i) => (
									<div
										key={col.id ?? i}
										className={richTextCellStyles({
											alignment: col.alignment,
											width: col.width,
										})}
									>
										<RichText content={col.content} />
									</div>
								))}
							</Grid>
						</Container>
					</Padding>
				</BackgroundColor>
			</Gutter>
		</div>
	)
}
