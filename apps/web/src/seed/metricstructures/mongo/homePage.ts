import { type Options } from 'payload/dist/collections/operations/local/create'

type PageOptions = Options<'pages'>

type Props = {
	heroMedia: string
	hancockFullWidthMediaId: string
	whoWeArePageId: string
	contentCollageMediaIds: string[]
	studiesId: string[]
}

export const homePageSeedData = ({
	heroMedia,
	hancockFullWidthMediaId,
	whoWeArePageId,
	contentCollageMediaIds,
	studiesId,
}: Props): PageOptions => ({
	collection: 'pages',
	data: {
		title: 'Home',
		slug: 'home',
		meta: {
			title: 'Home',
			type: 'website',
		},
		heroMedia,
		heroType: 'contentAboveMedia',
		heroContent: [
			{
				children: [
					{
						text: 'We bring together the',
					},
				],
				type: 'h5',
			},
			{
				children: [
					{
						text: 'Dreamers,',
						'red-headline': 'true',
					},
					{
						text: '\n',
					},
					{
						text: 'Thinkers,',
						'red-headline': 'true',
					},
					{
						text: '\n',
					},
					{
						text: '& Makers',
						'red-headline': 'true',
					},
				],
				type: 'h1',
			},
		],
		layout: [
			{
				backgroundColor: {
					color: 'none',
					colorPicker: 'none',
				},
				accentLine: false,
				accentLineAlignment: 'left',
				paddingTop: 'none',
				paddingBottom: 'medium',
				blockName: 'Subhead',
				blockType: 'content',
				columns: [
					{
						width: 'full',
						alignment: 'left',
						content: [
							{
								children: [
									{
										text: 'Because collaboration builds ',
									},
									{
										text: 'value',
										'red-underline': true,
									},
								],
								type: 'h3',
							},
						],
					},
				],
			},
			{
				backgroundColor: {
					color: 'red',
					colorPicker: 'red',
				},
				accentLineAlignment: 'left',
				accentLine: true,
				paddingTop: 'large',
				paddingBottom: 'medium',
				blockType: 'content',
				blockName: 'Question',
				columns: [
					{
						width: 'twoThirds',
						alignment: 'left',
						content: [
							{
								children: [
									{
										text: 'Our clients always ask,',
									},
								],
								type: 'h5',
							},
							{
								children: [
									{
										text: '“Shouldn’t all building processes go like this?”',
									},
								],
								type: 'h3',
							},
						],
					},
				],
			},
			{
				backgroundColor: {
					color: 'red',
					colorPicker: 'red',
				},
				accentLineAlignment: 'right',
				accentLine: true,
				paddingTop: 'medium',
				paddingBottom: 'large',
				blockType: 'content',
				blockName: 'Answer',
				columns: [
					{
						width: 'full',
						alignment: 'right',
						content: [
							{
								children: [
									{
										text: 'And we say,',
									},
								],
								type: 'h5',
							},
							{
								children: [
									{
										text: "“Of course.\r\nBut they don't.”",
									},
								],
								type: 'h3',
							},
						],
					},
				],
			},
			{
				size: 'medium',
				blockType: 'spacer',
				blockName: 'Spacer',
			},
			{
				backgroundColor: {
					color: 'blue',
					colorPicker: 'blue',
				},
				accentLineAlignment: 'left',
				accentLine: false,
				paddingTop: 'large',
				paddingBottom: 'small',
				blockType: 'content',
				blockName: 'Proof Points',
				columns: [
					{
						width: 'twoThirds',
						alignment: 'left',
						content: [
							{
								children: [
									{
										text: "There's a saying around here...",
									},
								],
								type: 'h3',
							},
						],
					},
				],
			},
			{
				backgroundColor: {
					color: 'blue',
					colorPicker: 'blue',
				},
				accentLine: false,
				accentLineAlignment: 'left',
				paddingTop: 'none',
				paddingBottom: 'small',
				blockType: 'content',
				blockName: 'Proof Points 2 Column',
				columns: [
					{
						width: 'twoThirds',
						alignment: 'left',
						content: [
							{
								children: [
									{
										text: 'Anything else is standard.',
										'red-underline': 'true',
									},
								],
								type: 'h3',
							},
						],
					},
					{
						width: 'oneThird',
						alignment: 'left',
						content: [
							{
								children: [
									{
										text: "It's a measurement pun, but it's also a reflection of how we think, work, and act.",
									},
								],
							},
						],
					},
				],
			},
			{
				backgroundColor: {
					color: 'blue',
					colorPicker: 'blue',
				},
				accentLine: false,
				accentLineAlignment: 'left',
				paddingTop: 'none',
				paddingBottom: 'none',
				blockType: 'content',
				blockName: 'Connect the narrative',
				columns: [
					{
						width: 'twoThirds',
						alignment: 'left',
						content: [
							{
								children: [
									{
										text: '',
									},
								],
							},
							{
								type: 'hr',
								children: [
									{
										text: ' ',
									},
								],
							},
							{
								children: [
									{
										text: '',
									},
								],
							},
							{
								children: [
									{
										text: 'And the results are resounding.',
									},
								],
								type: 'h4',
							},
						],
					},
				],
			},
			{
				backgroundColor: {
					color: 'blue',
					colorPicker: 'blue',
				},
				blockType: 'statistics',
				blockName: 'Statistics',
				topOverlap: 'large',
				bottomOverlap: 'large',
				stats: [
					{ stat: '17%', description: 'project cost reduction' },
					{ stat: '7 weeks', description: 'average time saved' },
					{ stat: '87%', description: 'client return rate' },
				],
			},
			{
				size: 'medium',
				blockType: 'spacer',
				blockName: 'Spacer',
			},
			{
				blockType: 'media',
				media: hancockFullWidthMediaId,
				type: 'fullscreen',
				blockName: 'Media Parallax',
			},
			{
				size: 'medium',
				blockType: 'spacer',
				blockName: 'Spacer',
			},
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
				blockName: 'Additional Content Headline',
				columns: [
					{
						width: 'full',
						alignment: 'left',
						content: [
							{
								children: [
									{
										text: 'We are here to be advocates and advisors for our clients.',
									},
								],
								type: 'h3',
							},
						],
					},
				],
			},
			{
				backgroundColor: {
					color: 'none',
					colorPicker: 'none',
				},
				accentLine: false,
				accentLineAlignment: 'left',
				paddingTop: 'none',
				paddingBottom: 'medium',
				blockType: 'content',
				blockName: 'Additional Content Body Copy',
				columns: [
					{
						width: 'half',
						alignment: 'left',
						content: [
							{
								children: [
									{
										text: 'We are allies to everyone willing to change the rules in our industry. We take extreme ownership for our client’s experience and their overall project outcome',
									},
								],
							},
						],
					},
					{
						width: 'half',
						alignment: 'left',
						content: [
							{
								children: [
									{
										text: 'We don’t just shape the buidlings that we build, we allow them to shape us. When we embark on a project we are both teachers and student, leaders and followers.',
									},
								],
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
				blockType: 'media-content-collage',
				blockName: 'Meet our Team',
				enableCTA: true,
				content: [
					{
						children: [
							{
								text: 'Teamwork makes your dream work.',
							},
						],
						type: 'h2',
					},
					{
						children: [
							{
								text: 'Our team is fully committed and endlessly willing to do whatever your project takes.',
							},
						],
					},
				],
				link: {
					type: 'reference',
					label: 'Meet Our Team',
					reference: {
						relationTo: 'pages',
						value: whoWeArePageId,
					},
					url: '',
				},
				media: contentCollageMediaIds.map((id) => ({
					media: id,
				})),
			},
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
				blockName: 'Studies Intro',
				columns: [
					{
						width: 'full',
						alignment: 'left',
						content: [
							{
								children: [
									{
										text: 'Here’s what happens when the Dreamers, Thinkers, and Makers come together. ',
									},
								],
								type: 'h3',
							},
						],
					},
				],
			},
			{
				backgroundColor: {
					color: 'red',
					colorPicker: 'red',
				},
				blockType: 'study-slider',
				blockName: 'Featured Studies',
				studies: studiesId,
			},
		],
	},
})
