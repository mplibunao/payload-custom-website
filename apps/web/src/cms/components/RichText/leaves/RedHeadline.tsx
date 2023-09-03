import { LeafButton } from 'payload/components/rich-text'
import { type RichTextCustomLeaf } from 'payload/types'
// @ts-ignore
import React from 'react'

const Button = () => <LeafButton format='red-headline'>Red Headline</LeafButton>

const Leaf = ({ attributes, children }: any) => (
	<span {...attributes} className='uppercase text-red'>
		{children}
	</span>
)

export const RedHeadline: RichTextCustomLeaf = {
	name: 'red-headline',
	Button,
	Leaf,
}
