import { type CollectionConfig } from 'payload/dist/collections/config/types'

import { FormSubmissions } from './FormSubmissions'
import { Pages } from './Pages'
import { Studies } from './Studies'

export const collections: CollectionConfig[] = [Pages, Studies, FormSubmissions]
