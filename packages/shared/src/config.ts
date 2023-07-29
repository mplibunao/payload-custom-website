export const getDotEnv = () => {
	if (Boolean(process.env.CI) || process.env.APP_ENV === 'production') {
		return false
	}

	if (process.env.APP_ENV === 'test') {
		return {
			path: '.env.test',
		}
	}

	return true
}
