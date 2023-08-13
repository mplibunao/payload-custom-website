import { type CollectionConfig } from 'payload/dist/collections/config/types'

import { Categories } from './Categories'
import { FormSubmissions } from './FormSubmissions'
import { Media } from './Media'
import { Pages } from './Pages'
import { Studies } from './Studies'

export const collections: CollectionConfig[] = [
	Pages,
	Studies,
	Media,
	FormSubmissions,
	Categories,
]
