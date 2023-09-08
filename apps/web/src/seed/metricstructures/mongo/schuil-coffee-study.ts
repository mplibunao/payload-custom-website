import { type Options } from 'payload/dist/collections/operations/local/create'

type StudiesOptions = Options<'studies'>
type Props = {
	categoryIds: string[]
	exteriorMediaId: string
	interiorMediaIds: [string, string]
	mediaCollageIds: string[]
}

export const schuilStudyData = ({
	categoryIds,
	exteriorMediaId,
	interiorMediaIds,
	mediaCollageIds,
}: Props): StudiesOptions => ({
	collection: 'studies',
	data: {
		categories: categoryIds,
		title: 'Caffeinated Collaboration',
		client: 'Schuil Coffee Company',
		location: 'Grand Rapids, MI',
		slug: 'schuil-coffee',
		meta: {
			title: 'Caffeinated Collaboration',
			description:
				'Schuil coffee company ushers in a new, more modern aesthetic through a building that reflects their vision for incredible quality and customer experience.\n\n',
			type: 'website',
		},
		previewMedia: interiorMediaIds
			.concat([exteriorMediaId])
			.map((id) => ({ media: id })),
		featuredMedia: exteriorMediaId,
		layout: [
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
										text: 'After acquiring the Schuil Coffee Company from its founders, the new owners were ready to usher in a new, more modern aesthetic—a building that reflected their vision for incredible quality and customer experience.',
									},
								],
								type: 'h4',
							},
							{
								children: [
									{
										text: '',
									},
								],
								type: 'p',
							},
							{
								children: [
									{
										text: 'The owners of Schuil reached out in 2019 after acquiring the building and the business. At first, they just needed help getting a signage permit approved by the city. But a few months later, they were ready for a much more substantial project, which included renovating their entire retail and office space',
									},
								],
								type: 'p',
							},
						],
					},
				],
			},
			{
				type: 'wide',
				blockType: 'media',
				blockName: '',
				media: interiorMediaIds[0],
				caption: [
					{
						children: [
							{
								text: '',
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
				blockName: '',
				columns: [
					{
						width: 'full',
						alignment: 'left',
						content: [
							{
								children: [
									{
										text: 'It was an amazing collaboration right from the start.',
									},
								],
								type: 'h4',
							},
							{
								children: [
									{
										text: 'Knowing that coffee is all about the experience, Schuil’s owners wanted to provide a modern and inviting environment for both their customers and their employees, while still respecting the legacy of the company. After a few iterations, we settled on an inventive design that balanced cost with creativity.',
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
				blockName: 'media collage',
				media: mediaCollageIds.map((id) => ({ media: id })),
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
										text: 'The new space was new, yet recognizable. Updated, yet comfortable. Modern, yet rooted in where the company began.',
									},
								],
								type: 'h4',
							},
							{
								children: [
									{
										text: 'At Metric Structures, we’re proud of what we built—not just an evolved space, but a lasting relationship with some amazing clients who roast some of the best coffee around.',
									},
								],
								type: 'p',
							},
						],
					},
				],
			},
			{
				type: 'wide',
				blockType: 'media',
				blockName: '',
				media: interiorMediaIds[1],
			},
		],
	},
})
