import escapeHTML from 'escape-html'
import { Fragment } from 'react'
import { Text } from 'slate'
import { twMerge } from 'tailwind-merge'

import { RedHeadline } from './RedHeadline'
import { RedUnderline } from './RedUnderline'

/*
 * To-do:
 *  - Add richtext styles
 */

type RichTextProps = {
	className?: string
	content: any
}

export const RichText = ({ className, content }: RichTextProps) => {
	if (!content) {
		return null
	}

	return (
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		<div className={twMerge(className, 'rich-text')}>{serialize(content)}</div>
	)
}

type Children = Leaf[]

type Leaf = {
	type: string
	value?: {
		url: string
		alt: string
	}
	children?: Children
	url?: string
	[key: string]: unknown
}

const serialize = (children?: Children) =>
	// eslint-disable-next-line max-statements, complexity
	children?.map((node, i) => {
		if (Text.isText(node)) {
			let text = (
				<span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
			)

			if (node.bold) {
				text = <strong key={i}>{text}</strong>
			}

			if (node['red-headline']) {
				text = <RedHeadline>{text}</RedHeadline>
			}

			if (node['red-underline']) {
				text = <RedUnderline>{text}</RedUnderline>
			}

			if (node.code) {
				text = <code key={i}>{text}</code>
			}

			if (node.italic) {
				text = <em key={i}>{text}</em>
			}

			if (node.underline) {
				text = (
					<span className='underline' key={i}>
						{text}
					</span>
				)
			}

			if (node.strikethrough) {
				text = (
					<span className='line-through' key={i}>
						{text}
					</span>
				)
			}

			return <Fragment key={i}>{text}</Fragment>
		}

		if (!node) {
			return null
		}

		switch (node.type) {
			case 'h1':
				return <h1 key={i}>{serialize(node.children)}</h1>
			case 'h2':
				return <h2 key={i}>{serialize(node.children)}</h2>
			case 'h3':
				return <h3 key={i}>{serialize(node.children)}</h3>
			case 'h4':
				return <h4 key={i}>{serialize(node.children)}</h4>
			case 'h5':
				return <h5 key={i}>{serialize(node.children)}</h5>
			case 'h6':
				return <h6 key={i}>{serialize(node.children)}</h6>
			case 'quote':
				return <blockquote key={i}>{serialize(node.children)}</blockquote>
			case 'ul':
				return <ul key={i}>{serialize(node.children)}</ul>
			case 'ol':
				return <ol key={i}>{serialize(node.children)}</ol>
			case 'li':
				return <li key={i}>{serialize(node.children)}</li>
			case 'link':
				return (
					<a href={escapeHTML(node.url)} key={i}>
						{serialize(node.children)}
					</a>
				)

			default:
				return <p key={i}>{serialize(node.children)}</p>
		}
	})
