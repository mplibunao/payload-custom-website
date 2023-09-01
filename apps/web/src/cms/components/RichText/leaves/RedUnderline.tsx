import { LeafButton } from 'payload/components/rich-text'
import { type RichTextCustomLeaf } from 'payload/types'
import React from 'react'

const Button = () => (
	<LeafButton format='red-underline'>Red Underline</LeafButton>
)

const Leaf = ({ attributes, children }: any) => (
	<span {...attributes} className='text-red underline'>
		{children}
	</span>
)

export const RedUnderline: RichTextCustomLeaf = {
	name: 'red-underline',
	Button,
	Leaf,
}
