export const FOOTER_KEY = 'footer'
export const MEGA_MENU_KEY = 'mega-menu'
export const SOCIAL_MEDIA_KEY = 'social-media'

export const getMegaMenu = (ctx: Express.Locals) => {
	return ctx.cacheService.exec(
		() => ctx.payload.findGlobal({ slug: 'mega-menu', overrideAccess: false }),
		[MEGA_MENU_KEY],
	)
}

export const getFooter = (ctx: Express.Locals) => {
	return ctx.cacheService.exec(
		() => ctx.payload.findGlobal({ slug: 'footer', overrideAccess: false }),
		[FOOTER_KEY],
	)
}

export const getSocialMedia = (ctx: Express.Locals) => {
	return ctx.cacheService.exec(
		() =>
			ctx.payload.findGlobal({ slug: 'social-media', overrideAccess: false }),
		[SOCIAL_MEDIA_KEY],
	)
}
