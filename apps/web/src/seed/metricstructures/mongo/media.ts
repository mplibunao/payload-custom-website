import path from 'path'
import { type Options } from 'payload/dist/collections/operations/local/create'

type MediaOptions = Options<'media'>
type HomeMedia = Record<'hero' | 'hancock', MediaOptions> &
	Record<'contentCollage', MediaOptions[]>

/*
 *Home Page Media
 */
export const homeMedia: HomeMedia = {
	hero: {
		overwriteExistingFiles: true,
		collection: 'media',
		filePath: path.resolve(__dirname, 'home-hero.jpg'),
		data: {
			alt: 'Building with trees',
		},
	},
	hancock: {
		overwriteExistingFiles: true,
		collection: 'media',
		filePath: path.resolve(__dirname, 'hancock-full-width.jpg'),
		data: {
			alt: 'Hancock Plant Wall',
		},
	},
	contentCollage: [
		{
			overwriteExistingFiles: true,
			collection: 'media',
			filePath: path.resolve(__dirname, 'friends-1.jpg'),
			data: {
				alt: 'man sitting on wheelchair holding near full clear drinking glass beside standing and smiling man',
			},
		},
		{
			overwriteExistingFiles: true,
			collection: 'media',
			filePath: path.resolve(__dirname, 'conversation-1.jpg'),
			data: {
				alt: 'people laughing and talking outside during daytime',
			},
		},
		{
			overwriteExistingFiles: true,
			collection: 'media',
			filePath: path.resolve(__dirname, 'meeting.jpg'),
			data: {
				alt: 'meeting',
			},
		},
		{
			overwriteExistingFiles: true,
			collection: 'media',
			filePath: path.resolve(__dirname, 'architect.jpg'),
			data: {
				alt: 'Architect at work',
			},
		},
		{
			overwriteExistingFiles: true,
			collection: 'media',
			filePath: path.resolve(__dirname, 'office-2.jpg'),
			data: {
				alt: 'Woman walking while smiling in the office',
			},
		},
		{
			overwriteExistingFiles: true,
			collection: 'media',
			filePath: path.resolve(__dirname, 'construction-1.jpg'),
			data: {
				alt: 'A builder working on a deck ready to lay the next piece of timber',
			},
		},
	],
}

type WhoWeAreMedia = Record<
	'hero' | 'constructionTripod' | 'teamLunch',
	MediaOptions
> &
	Record<'mediaGrid' | 'slides', MediaOptions[]>

export const whoWeAreMedia: WhoWeAreMedia = {
	hero: {
		overwriteExistingFiles: true,
		collection: 'media',
		filePath: path.resolve(__dirname, 'who-we-are.jpg'),
		data: {
			alt: 'Table with people in a meeting',
		},
	},
	constructionTripod: {
		overwriteExistingFiles: true,
		collection: 'media',
		filePath: path.resolve(__dirname, 'construction-tripod.jpg'),
		data: {
			alt: 'Man with construction tripod',
		},
	},
	teamLunch: {
		overwriteExistingFiles: true,
		collection: 'media',
		filePath: path.resolve(__dirname, 'team-lunch.jpg'),
		data: {
			alt: 'People eating a meal around a table',
		},
	},
	mediaGrid: [
		{
			overwriteExistingFiles: true,
			collection: 'media',
			filePath: path.resolve(__dirname, 'gaby-yu.jpg'),
			data: {
				alt: 'Gaby Yu',
			},
		},
		{
			overwriteExistingFiles: true,
			collection: 'media',
			filePath: path.resolve(__dirname, 'cameron.jpg'),
			data: {
				alt: 'Cameron',
			},
		},
		{
			overwriteExistingFiles: true,
			collection: 'media',
			filePath: path.resolve(__dirname, 'kat.jpg'),
			data: {
				alt: 'Kat',
			},
		},
		{
			overwriteExistingFiles: true,
			collection: 'media',
			filePath: path.resolve(__dirname, 'christina.jpg'),
			data: {
				alt: 'Christina',
			},
		},
		{
			overwriteExistingFiles: true,
			collection: 'media',
			filePath: path.resolve(__dirname, 'lance.jpg'),
			data: {
				alt: 'Lance',
			},
		},
		{
			overwriteExistingFiles: true,
			collection: 'media',
			filePath: path.resolve(__dirname, 'kent.jpg'),
			data: {
				alt: 'Kent',
			},
		},
	],
	slides: [
		{
			overwriteExistingFiles: true,
			collection: 'media',
			filePath: path.resolve(__dirname, 'designer.jpg'),
			data: {
				alt: 'Designer',
			},
		},
		{
			overwriteExistingFiles: true,
			collection: 'media',
			filePath: path.resolve(__dirname, 'meeting-2.jpg'),
			data: {
				alt: 'Designer',
			},
		},
		{
			overwriteExistingFiles: true,
			collection: 'media',
			filePath: path.resolve(__dirname, 'cornhole-boards.jpg'),
			data: {
				alt: 'Men playing cornhole boards',
			},
		},
		{
			overwriteExistingFiles: true,
			collection: 'media',
			filePath: path.resolve(__dirname, 'open-office.jpg'),
			data: {
				alt: 'People working in an open office space',
			},
		},
	],
}

type OurApproachMedia = MediaOptions[]

/*
 *schuil study
 */
export const schuilMediaData: OurApproachMedia = [
	{
		overwriteExistingFiles: true,
		collection: 'media',
		filePath: path.resolve(__dirname, 'SchuilCafeRemodel-00169.jpg'),
		data: {
			alt: 'Outside the remodeled Schuil Cafe',
		},
	},
	{
		overwriteExistingFiles: true,
		collection: 'media',
		filePath: path.resolve(__dirname, 'SchuilCafeRemodel-00129-4.jpg'),
		data: {
			alt: 'Inside the remodeled Schuil Cafe',
		},
	},
	{
		overwriteExistingFiles: true,
		collection: 'media',
		filePath: path.resolve(__dirname, 'SchuilCafeRemodel-00129-3.jpg'),
		data: {
			alt: 'Inside the remodeled Schuil Cafe',
		},
	},
	{
		overwriteExistingFiles: true,
		collection: 'media',
		filePath: path.resolve(__dirname, 'Schuil5-1536x926.jpeg'),
		data: {
			alt: 'Schuil Cafe under renovation',
		},
	},
	{
		overwriteExistingFiles: true,
		collection: 'media',
		filePath: path.resolve(__dirname, 'schuil-study-2.jpg'),
		data: {
			alt: 'Schuil Mug in renovation area',
		},
	},
	{
		overwriteExistingFiles: true,
		collection: 'media',
		filePath: path.resolve(__dirname, 'schuil-circle.jpg'),
		data: {
			alt: 'Schuil Logo',
		},
	},
]

/*
 * hancock study
 */
export const hancockMediaData: MediaOptions[] = [
	{
		overwriteExistingFiles: true,
		collection: 'media',
		filePath: path.resolve(__dirname, '2020_HancockPlantWall_0027-min-1.jpg'),
		data: {
			alt: 'Hancock Plant Wall',
		},
	},
	{
		overwriteExistingFiles: true,
		collection: 'media',
		filePath: path.resolve(
			__dirname,
			'2020_hancockplantwall_0004_49746538712_o-1.jpg',
		),
		data: {
			alt: 'Hancock Plant Wall',
		},
	},
	{
		overwriteExistingFiles: true,
		collection: 'media',
		filePath: path.resolve(__dirname, 'hancock-3.jpg'),
		data: {
			alt: 'Hancock Plant Wall',
		},
	},
	{
		overwriteExistingFiles: true,
		collection: 'media',
		filePath: path.resolve(__dirname, '280BS_ReeceBS_Hugh_Hancock_DVDP.jpg'),
		data: {
			alt: 'Reece Hancock walking with a pitcher of water inside hancock',
		},
	},
	{
		overwriteExistingFiles: true,
		collection: 'media',
		filePath: path.resolve(__dirname, 'hancock-7.jpg'),
		data: {
			alt: 'Hancock chairs and tables',
		},
	},
	{
		overwriteExistingFiles: true,
		collection: 'media',
		filePath: path.resolve(__dirname, 'hancock-8.jpg'),
		data: {
			alt: 'Hancock chairs',
		},
	},
]
