import { type CacheUpdateKey } from '~/server/infra/cache.server'

export const FOOTER_KEY = 'footer'
export const MEGA_MENU_KEY = 'mega-menu'
export const SOCIAL_MEDIA_KEY = 'social-media'
export const getPageCacheKey = (slug: string): CacheUpdateKey => ['page', slug]
