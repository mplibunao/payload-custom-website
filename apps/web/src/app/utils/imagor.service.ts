/* eslint-disable max-statements */

import crypto from 'node:crypto'

import { isServer } from './misc'

// obfuscate sensitive info to defer noobs until rsc is release in remix
export interface ImagorSecrets {
	u: string
	s: string
}

declare global {
	namespace NodeJS {
		interface ProcessEnv extends ImagorSecrets {}
	}
	interface Window extends ImagorSecrets {}
}

class ImagorService {
	private imagePath: string = ''
	private width: number | 'orig' = 0
	private height: number | 'orig' = 0
	private smart?: boolean
	private fitInFlag?: boolean
	private withFlipHorizontally?: boolean
	private withFlipVertically?: boolean
	private halignValue?: string
	private valignValue?: string
	private cropValues?: {
		left: number
		top: number
		right: number
		bottom: number
	}
	private meta?: boolean
	private filtersCalls: string[] = []
	private imagorServerUrl?: string
	private secret?: string

	private getSecrets() {
		return {
			secret: this.secret ?? isServer ? process.env.s : window.s,
			imagorServerUrl:
				this.imagorServerUrl ?? isServer ? process.env.u : window.u,
		}
	}
	/**
	 * Set path of image
	 * @param {String} imagePath The path of the image you want to fetch
	 */
	public setImagePath(imagePath: string): this {
		this.imagePath =
			imagePath.charAt(0) === '/'
				? imagePath.substring(1, imagePath.length)
				: imagePath
		return this
	}

	/**
	 * Converts operation array to string
	 * @return {String}
	 */
	private getOperationPath(): string {
		const parts = this.urlParts()
		if (parts.length === 0) {
			return ''
		}
		return parts.join('/') + '/'
	}

	/**
	 * Build operation array
	 * @return {Array}
	 */
	private urlParts(): string[] {
		if (!this.imagePath) {
			throw new Error('Image URL is required.')
		}
		const parts: string[] = []
		if (this.meta) {
			parts.push('meta')
		}
		if (this.cropValues) {
			parts.push(
				`${this.cropValues.left}x${this.cropValues.top}:${this.cropValues.right}x${this.cropValues.bottom}`,
			)
		}
		if (this.fitInFlag) {
			parts.push('fit-in')
		}
		if (
			this.width ||
			this.height ||
			this.withFlipHorizontally ||
			this.withFlipVertically
		) {
			let sizeString = ''
			if (this.withFlipHorizontally) {
				sizeString += '-'
			}
			sizeString += this.width
			sizeString += 'x'
			if (this.withFlipVertically) {
				sizeString += '-'
			}
			sizeString += this.height
			parts.push(sizeString)
		}
		if (this.halignValue) {
			parts.push(this.halignValue)
		}
		if (this.valignValue) {
			parts.push(this.valignValue)
		}
		if (this.smart) {
			parts.push('smart')
		}
		if (this.filtersCalls.length) {
			parts.push(`filters:${this.filtersCalls.join(':')}`)
		}
		return parts
	}

	/**
	 * Resize the image to the specified dimensions. Overrides any previous call
	 * to `fitIn` or `resize`.
	 *
	 * Use a value of 0 for proportional resizing. E.g. for a 640 x 480 image,
	 * `.resize(320, 0)` yields a 320 x 240 thumbnail.
	 *
	 * Use a value of 'orig' to use an original image dimension. E.g. for a 640
	 * x 480 image, `.resize(320, 'orig')` yields a 320 x 480 thumbnail.
	 * @param  {(string|number)} width 'orig', number, 0
	 * @param  {(string|number)} height 'orig', number, 0
	 */
	public resize(width: number | 'orig', height: number | 'orig'): this {
		this.width = width
		this.height = height
		this.fitInFlag = false
		return this
	}

	/**
	 * Uses some very advanced techniques for obtaining important points of the image
	 * referred to as Focal Points
	 *
	 * @param  {boolean} smartCrop
	 */
	public smartCrop(smartCrop: boolean): this {
		this.smart = smartCrop
		return this
	}

	/**
	 * Resize the image to fit in a box of the specified dimensions. Overrides
	 * any previous call to `fitIn` or `resize`.
	 *
	 * @param  {(string|number)} width 'orig', number, 0
	 * @param  {(string|number)} height 'orig', number, 0
	 */
	public fitIn(width: number | 'orig', height: number | 'orig'): this {
		this.width = width
		this.height = height
		this.fitInFlag = true
		return this
	}

	/**
	 * Flip image horizontally
	 */
	public flipHorizontally(): this {
		this.withFlipHorizontally = true
		return this
	}

	/**
	 * Flip image vertically
	 */
	public flipVertically(): this {
		this.withFlipVertically = true
		return this
	}

	/**
	 * Specify horizontal alignment used if width is altered due to cropping
	 * @param  {String} halign 'left', 'center', 'right'
	 */
	public halign(halign: 'left' | 'center' | 'right'): this {
		this.halignValue = halign
		return this
	}

	/**
	 * Specify vertical alignment used if height is altered due to cropping
	 * @param  {String} valign 'top', 'middle', 'bottom'
	 */
	public valign(valign: 'top' | 'middle' | 'bottom'): this {
		this.valignValue = valign
		return this
	}

	/**
	 * Specify that JSON metadata should be returned instead of the thumbnailed
	 * image.
	 * @param  {Boolean} metaDataOnly
	 */
	public metaDataOnly(metaDataOnly: boolean): this {
		this.meta = metaDataOnly
		return this
	}

	/**
	 * Append a filter, e.g. quality(80)
	 * Can be chained multiple times to create a filter pipeline that will be applied sequentially
	 * When falsy value is passed, skips adding to array
	 * @param  {(String|undefined)} filterCall
	 */
	public filter(filterCall?: string): this {
		if (filterCall) this.filtersCalls.push(filterCall)
		return this
	}
	/**
	 * Manually specify crop window.
	 * @param  {Integer} left
	 * @param  {Integer} top
	 * @param  {Integer} right
	 * @param  {Integer} bottom
	 */
	public crop(left: number, top: number, right: number, bottom: number): this {
		this.cropValues = {
			left,
			top,
			right,
			bottom,
		}
		return this
	}

	/**
	 * Combine image url and operations with secure and unsecure (unsafe) paths
	 * Resets the filtersCalls array
	 * @return {String}
	 */
	public buildUrl(): string {
		const operation = this.getOperationPath()
		const { imagorServerUrl, secret } = this.getSecrets()
		if (secret) {
			const safeKey = this.sign(`${operation}${this.imagePath}`, secret)

			return `${imagorServerUrl}/${safeKey}`
		} else {
			return `${imagorServerUrl}/unsafe/${operation}${this.imagePath}`
		}
		this.filtersCalls = []
	}

	private sign(path: string, secret: string) {
		const hash = crypto
			.createHmac('sha256', secret)
			.update(path)
			.digest('base64')
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
		return hash + '/' + path
	}

	//private async sign(path: string, secret: string) {
	//console.log(crypto)
	//const encoder = new TextEncoder()
	//const data = encoder.encode(path)
	//const key = await crypto.subtle.importKey(
	//'raw',
	//encoder.encode(secret),
	//{ name: 'HMAC', hash: 'SHA-256' },
	//false,
	//['sign'],
	//)
	//const signature = await crypto.subtle.sign('HMAC', key, data)
	//const hashArray = Array.from(new Uint8Array(signature))
	//const base64Hash = btoa(String.fromCharCode(...hashArray))
	//return base64Hash + '/' + path
	//}
}

export const imagorService = new ImagorService()
