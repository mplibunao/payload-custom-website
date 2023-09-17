import { type AriaAttributes, type DOMAttributes } from 'react'

declare module 'react' {
	interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
		fetchpriority?: 'high' | 'low' | 'auto'
	}
}
