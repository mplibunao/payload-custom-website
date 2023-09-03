/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ElementButton } from 'payload/components/rich-text'
import { type RichTextCustomElement } from 'payload/types'
// @ts-ignore
import React, { useCallback } from 'react'
import { Transforms } from 'slate'
import { useSlate, ReactEditor } from 'slate-react'

import './hr.scss'

import { type RichTextElement } from 'payload/dist/fields/config/types'

// @ts-expect-error
const insertHR = (editor) => {
	const text = { text: ' ' }
	const hr = {
		type: 'hr',
		children: [text],
	}

	const nodes = [hr, { children: [{ text: '' }] }]

	if (editor.blurSelection) {
		Transforms.select(editor, editor.blurSelection)
	}

	Transforms.insertNodes(editor, nodes)

	const currentPath = editor.selection.anchor.path[0]
	const newSelection = {
		anchor: { path: [currentPath + 1, 0], offset: 0 },
		focus: { path: [currentPath + 1, 0], offset: 0 },
	}

	Transforms.select(editor, newSelection)
	ReactEditor.focus(editor)
}

const Button = () => {
	const editor = useSlate()

	const handleAddHR = useCallback(() => {
		insertHR(editor)
	}, [editor])

	return (
		<ElementButton format='hr' onClick={handleAddHR}>
			—
		</ElementButton>
	)
}

const Element = ({ attributes, children }: any) => {
	return (
		<div contentEditable={false}>
			<span {...attributes} className='rich-text-hr'>
				<hr className='rich-text-hr' />
				{children}
			</span>
		</div>
	)
}
const plugin: NonNullable<RichTextCustomElement['plugins']>[0] = (
	incomingEditor,
) => {
	const editor = incomingEditor
	const { isVoid } = editor

	// @ts-expect-error
	editor.isVoid = (element) => (element.type === 'hr' ? true : isVoid(element))

	return editor
}

export const HR: RichTextElement = {
	name: 'hr',
	Button,
	Element,
	plugins: [plugin],
}
