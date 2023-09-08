import { type Options } from 'payload/dist/collections/operations/local/create'

type StudiesOptions = Options<'studies'>
type Props = {
	categoryIds: string[]
	plantWallMedia: [string, string, string]
	tableMedia: [string, string, string]
}

export const hancockStudyData = ({
	categoryIds,
	plantWallMedia,
	tableMedia,
}: Props): StudiesOptions => ({
	collection: 'studies',
	data: {
		categories: categoryIds,
		title: 'History Meets Hot Chicken',
		client: 'Hancock',
		location: 'Grand Rapids, Michigan',
		slug: 'hancock',
		meta: {
			title: 'History Meets Hot Chicken',
			description:
				'1157 Wealthy Street is where Nashville Heat meets Michigan Neat.  Historic preservation and modern updates preserve the charm of this former gas station-turned restaurant.\n',
			type: 'website',
		},
		featuredMedia: plantWallMedia[0],
		previewMedia: [tableMedia[2], plantWallMedia[1], tableMedia[1]].map(
			(id) => ({ media: id }),
		),
		layout: [
			{
				backgroundColor: {
					color: 'none',
					colorPicker: 'none',
				},
				accentLine: false,
				accentLineAlignment: 'left',
				paddingTop: 'medium',
				paddingBottom: 'small',
				blockType: 'content',
				blockName: '',
				columns: [
					{
						width: 'full',
						alignment: 'left',
						content: [
							{
								children: [
									{
										text: '\nBack in 2008, an entrepreneur named Paul Lee saw potential where nobody else did—on Wealthy Street.',
									},
								],
								type: 'h4',
							},
							{
								type: 'paragraph',
								children: [
									{
										text: 'In the following years, Paul opened two restaurants, bringing a business district back to life. Then, in early 2018 – 10 years after opening his first restaurant – Metric Structures was introduced to Paul and learned about his next vision. ',
									},
								],
							},
							{
								type: 'paragraph',
								children: [
									{
										text: ' ',
									},
								],
							},
						],
					},
				],
			},
			{
				type: 'wide',
				blockType: 'media',
				blockName: '',
				media: tableMedia[0],
			},
			{
				backgroundColor: {
					color: 'none',
					colorPicker: 'none',
				},
				accentLine: false,
				accentLineAlignment: 'left',
				paddingTop: 'medium',
				paddingBottom: 'medium',
				blockType: 'content',
				blockName: '',
				columns: [
					{
						width: 'full',
						alignment: 'left',
						content: [
							{
								children: [
									{
										text: 'Paul Lee had a big idea for a tiny building on the corner of Wealthy and Fuller. And our goal was to do everything to make that vision a reality. ',
									},
								],
								type: 'h4',
							},
							{
								children: [
									{
										text: 'Historic renovations can be a challenge. The Hancock project was no exception.  The building had a long heritage, stretching back to its time as a gas station. Our goal was to respect the character of this unique space while updating to modern standards. One example of this was preserving the garage doors to provide indoor/outdoor seating. ',
									},
								],
								type: 'p',
							},
						],
					},
				],
			},
			{
				blockType: 'media-collage',
				blockName: '',
				media: plantWallMedia.map((id) => ({ media: id })),
			},
			{
				backgroundColor: {
					color: 'none',
					colorPicker: 'none',
				},
				accentLine: false,
				accentLineAlignment: 'left',
				paddingTop: 'medium',
				paddingBottom: 'none',
				blockType: 'content',
				blockName: '',
				columns: [
					{
						width: 'full',
						alignment: 'left',
						content: [
							{
								children: [
									{
										text: 'Today, 1157 Wealthy Street is where Nashville Heat meets Michigan Neat. Anyone and everyone can stop for a drink in the same place people once stopped for gas, proving that you can always give an old space new life.\n\n\n\n',
									},
								],
								type: 'p',
							},
						],
					},
				],
			},
			{
				backgroundColor: {
					color: 'orange',
					colorPicker: 'orange',
				},
				blockType: 'slider',
				blockName: '',
				slides: [tableMedia[1], plantWallMedia[2], tableMedia[2]].map((id) => ({
					media: id,
				})),
			},
		],
	},
})
