import { type Options } from 'payload/dist/collections/operations/local/create'

type PageOptions = Options<'pages'>

type Props = {
	heroMedia: string
	contentCollageMediaIds: string[]
	mediaGridIds: string[]
	teamLunchMedia: string
	slideMediaIds: string[]
}

export const whoWeArePageData = ({
	heroMedia,
	contentCollageMediaIds,
	mediaGridIds,
	teamLunchMedia,
	slideMediaIds,
}: Props): PageOptions => ({
	collection: 'pages',
	data: {
		title: 'Who We Are',
		slug: 'who-we-are',
		meta: {
			title: 'Who We Are',
			type: 'website',
		},
		heroContent: [
			{
				children: [
					{
						text: 'Our values drive and define ',
					},
					{
						text: 'everything we do.',
						'red-underline': 'true',
					},
				],
				type: 'h1',
			},
		],
		heroType: 'contentLeftOfMedia',
		heroMedia,
		layout: [
			{
				backgroundColor: {
					color: 'none',
					colorPicker: 'none',
				},
				accentLine: false,
				accentLineAlignment: 'left',
				paddingTop: 'none',
				paddingBottom: 'large',
				blockType: 'content',
				blockName: 'Intro',
				columns: [
					{
						width: 'full',
						alignment: 'left',
						content: [
							{
								children: [
									{
										text: 'We build trust, opportunity, and buildings. In that order. ',
									},
								],
								type: 'h3',
							},
						],
					},
					{
						width: 'full',
						alignment: 'left',
						content: [
							{
								children: [
									{
										text: 'As a team and as people, we strive to be more than just general contractors. Our values make that possible. ',
									},
								],
							},
						],
					},
				],
			},
			{
				blockType: 'sticky-content',
				blockName: 'Values',
				sections: [
					{
						label: 'Collaboration',
						description:
							'No egos. No agendas. Just an all-out dedication to the goal at hand.',
					},
					{
						label: 'Transparency ',
						description:
							'We showcase our true selves and believe honesty matters a whole lot. ',
					},
					{
						label: 'Community ',
						description:
							'Our goal is creating more seats at the table. A place everyone belongs.',
					},
					{
						label: 'Adaptability',
						description:
							'We aren’t rigid and resistant to change. We adapt and overcome. ',
					},
					{
						label: 'Relationships',
						description:
							'We invest in people, build trust, and deposit more than we withdraw. ',
					},
				],
			},
			{
				blockType: 'media-collage',
				blockName: '',
				media: contentCollageMediaIds.map((id) => ({ media: id })),
			},
			{
				backgroundColor: {
					color: 'none',
					colorPicker: 'none',
				},
				accentLine: false,
				accentLineAlignment: 'left',
				paddingTop: 'large',
				paddingBottom: 'none',
				blockType: 'content',
				blockName: 'Team Headline',
				columns: [
					{
						width: 'full',
						alignment: 'left',
						content: [
							{
								children: [
									{
										text: 'We’re a team. \r\nNot a hierarchy.',
									},
								],
								type: 'h2',
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
				blockType: 'media-grid',
				blockName: 'Team',
				content: [
					{
						children: [
							{
								text: '',
							},
						],
						type: 'h2',
					},
				],
				media: mediaGridIds.map((id) => ({ media: id })),
			},
			{
				type: 'fullscreen',
				blockType: 'media',
				blockName: '',
				media: teamLunchMedia,
			},
			{
				size: 'medium',
				blockType: 'spacer',
				blockName: '',
			},
			{
				backgroundColor: {
					color: 'blue',
					colorPicker: 'blue',
				},
				blockType: 'slider',
				blockName: 'Team Media Slider',
				slides: slideMediaIds.map((id) => ({ media: id })),
			},
			{
				size: 'large',
				blockType: 'spacer',
				blockName: '',
			},
			{
				backgroundColor: {
					color: 'orange',
					colorPicker: 'orange',
				},
				blockType: 'cta',
				blockName: 'CTA',
				content: [
					{
						children: [
							{
								text: 'Want to collaborate?',
							},
						],
						type: 'h2',
					},
					{
						children: [
							{
								text: 'Tell us more about your project, and our network of experts will help you make your goals a reality.',
							},
						],
						type: 'p',
					},
				],
				actions: [
					{
						link: {
							reference: {
								relationTo: 'pages',
								value: '',
							},
							type: 'custom',
							label: 'Get in Touch',
							url: '/contact',
						},
					},
				],
			},
		],
	},
})
