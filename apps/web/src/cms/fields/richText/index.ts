import {
	type RichTextElement,
	type RichTextLeaf,
} from 'payload/dist/fields/config/types'
import { type RichTextField } from 'payload/types'
import { HR } from '~/cms/components/RichText/leaves/HR'
import { RedHeadline } from '~/cms/components/RichText/leaves/RedHeadline'
import { RedUnderline } from '~/cms/components/RichText/leaves/RedUnderline'
import { deepMerge } from '~/cms/utils/deepMerge'

type RichText = (
	overrides?: Partial<RichTextField>,
	additions?: {
		preElements?: RichTextElement[]
		preLeaves?: RichTextLeaf[]
		elements?: RichTextElement[]
		leaves?: RichTextLeaf[]
	},
) => RichTextField

export const richText: RichText = (
	overrides = {},
	additions = {
		elements: [],
		leaves: [],
		preElements: [],
		preLeaves: [],
	},
) =>
	deepMerge<RichTextField, Partial<RichTextField>>(
		{
			name: 'richText',
			type: 'richText',
			required: true,
			admin: {
				leaves: [
					...(additions.preLeaves || []),
					'bold',
					'italic',
					'underline',
					'strikethrough',
					'code',
					RedHeadline,
					RedUnderline,
					...(additions.leaves || []),
				],
				elements: [
					...(additions.preElements || []),
					'h2',
					'h3',
					'h4',
					'h5',
					'h6',
					'ul',
					'ol',
					'indent',
					'link',
					HR,
					'relationship',
					'upload',
					'blockquote',
					...(additions.elements || []),
				],
			},
		},
		overrides,
	)
