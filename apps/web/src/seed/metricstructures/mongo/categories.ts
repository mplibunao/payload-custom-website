import { type Options } from 'payload/dist/collections/operations/local/create'

type CategoriesOptions = Options<'categories'>

export const categoriesData: CategoriesOptions[] = [
	{
		collection: 'categories',
		data: {
			slug: 'design',
			title: 'Design',
		},
	},
	{
		collection: 'categories',
		data: {
			title: 'Build',
			slug: 'build',
		},
	},

	{
		collection: 'categories',
		data: {
			title: 'Architecture',
			slug: 'architecture',
		},
	},
]
