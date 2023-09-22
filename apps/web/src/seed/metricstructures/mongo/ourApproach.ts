import { type Options } from 'payload/dist/collections/operations/local/create'

type PageOptions = Options<'pages'>

type Props = {
	mediaStatCollageMediaIds: string[]
}

export const ourApproachPageData = ({
	mediaStatCollageMediaIds,
}: Props): PageOptions => ({
	collection: 'pages',
	data: {
		title: 'Our Approach',
		contentType: 'static',
		slug: 'our-approach',
		meta: {
			title: 'Our Approach',
			type: 'website',
		},
		heroMedia: '',
		heroType: 'minimal',
		heroContent: [
			{
				children: [
					{
						text: 'What makes us anything but standard',
					},
				],
				type: 'h3',
			},
		],
		layout: [
			{
				blockType: 'sticky-content',
				blockName: 'Principles',
				sections: [
					{
						label: 'Collaboration',
						description:
							'No egos. No agendas. Just an all-out dedication to the goal at hand.',
					},
					{
						label: 'Transparency',
						description:
							'We showcase our true selves and believe honesty matters a whole lot.',
					},
					{
						label: 'Community',
						description:
							'Our goal is creating more seats at the table. A place everyone belongs.',
					},
					{
						label: 'Adaptability',
						description:
							'We aren’t rigid and resistant to change. We adapt and overcome.',
					},
					{
						label: 'Relationships',
						description:
							'We invest in people, build trust, and deposit more than we withdraw.',
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
				paddingTop: 'large',
				paddingBottom: 'medium',
				blockType: 'content',
				blockName: 'Making many teams work as one',
				columns: [
					{
						width: 'full',
						alignment: 'center',
						content: [
							{
								children: [
									{
										text: 'We have a rare ability to make many teams work as one.',
									},
								],
								type: 'h2',
							},
							{
								children: [
									{
										text: 'Our team takes extreme ownership of the process, becoming a single point of responsibility. It honestly makes all the difference. ',
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
					color: 'none',
					colorPicker: 'none',
				},
				accentLineAlignment: 'left',
				paddingTop: 'large',
				paddingBottom: 'none',
				blockType: 'content',
				blockName: 'Additional details about the process',
				columns: [
					{
						width: 'twoThirds',
						alignment: 'left',
						content: [
							{
								children: [
									{
										text: 'We are changing the industry.',
									},
								],
								type: 'h3',
							},
						],
					},
				],
				accentLine: false,
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
				blockName: '',
				columns: [
					{
						width: 'half',
						alignment: 'left',
						content: [
							{
								children: [
									{
										text: 'We find that the industry-standard fragmentation accounts for 24% to 31% of the overall project.',
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
										text: 'We promote multi-disciplinary collaboration to drive innovation, cut costs, reduce risk, and help us serve a larger purpose for our stakeholders.',
									},
								],
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
				paddingTop: 'medium',
				paddingBottom: 'medium',
				blockType: 'content',
				blockName: 'Result Intro',
				columns: [
					{
						width: 'full',
						alignment: 'center',
						content: [
							{
								children: [
									{
										text: 'The result?',
									},
								],
								type: 'h5',
							},
							{
								children: [
									{
										text: 'Everything you ',
									},
									{
										text: 'dreamed',
										'red-underline': 'true',
									},
									{
										text: ' it would be.',
									},
								],
								type: 'h2',
							},
						],
					},
				],
			},
			{
				topOverlap: 'large',
				bottomOverlap: 'none',
				blockType: 'media-stat-collage',
				blockName: '',
				stats: [
					{
						stat: '20%',
						description: 'project cost reduction',
					},
					{
						stat: '18%',
						description: 'average time saved',
					},
					{
						stat: '87%',
						description: 'client return rate',
					},
				],
				media: mediaStatCollageMediaIds.map((id) => ({ media: id })),
			},
			{
				size: 'medium',
				blockType: 'spacer',
				blockName: '',
			},
			{
				backgroundColor: {
					color: 'orange',
					colorPicker: 'orange',
				},
				blockType: 'cta',
				blockName: '',
				content: [
					{
						children: [
							{
								text: "Like what you're seeing?",
							},
						],
						type: 'h2',
					},
					{
						children: [
							{
								text: 'Tell us about a project you have in mind, or check out some of our previous work to see our process in action.',
							},
						],
					},
				],
				actions: [
					{
						link: {
							type: 'custom',
							label: 'Get in Touch',
							url: '/contact',
						},
					},
					{
						link: {
							type: 'custom',
							label: 'See our Work',
							url: '/studies',
						},
					},
				],
			},
		],
	},
})
