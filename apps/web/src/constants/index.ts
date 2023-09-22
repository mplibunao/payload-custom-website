export const MEDIA_LOCAL_DIR = '/media/assets'

export const PAYLOAD_ADMIN_EMAIL = 'admin@example.com'
export const PAYLOAD_ADMIN_PASSWORD = 'admin'

export const CACHE_STATIC =
	'public, max-age=60, s-max-age=120, stale-while-revalidate=86400, stale-if-error=86400'

export const CACHE_OLD_STATIC =
	'public, max-age=3600, s-max-age=3600, stale-while-revalidate=86400, stale-if-error=86400'

export const CACHE_DYNAMIC =
	'public, max-age=1, s-max-age=1, stale-while-revalidate=86400, stale-if-error=86400'
