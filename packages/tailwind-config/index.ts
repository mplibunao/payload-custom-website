import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

function withPalette(palette: string) {
	return {
		50: `var(--${palette}-50)`,
		100: `var(--${palette}-100)`,
		200: `var(--${palette}-200)`,
		300: `var(--${palette}-300)`,
		400: `var(--${palette}-400)`,
		500: `var(--${palette}-500)`,
		600: `var(--${palette}-600)`,
		700: `var(--${palette}-700)`,
		800: `var(--${palette}-800)`,
		900: `var(--${palette}-900)`,
	}
}

export default {
	content: [
		'./src/components/**/*.{tsx,ts}',
		'./src/pages/**/*.{tsx,ts}',
		'./src/app/**/*.{tsx,ts}',
		'./src/features/**/*.{tsx,ts}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				primary: withPalette('primary'),
				neutral: withPalette('neutral'),
				success: withPalette('success'),
				warning: withPalette('warning'),
				error: withPalette('error'),
				info: withPalette('info'),
			},
			textColor: {
				primary: withPalette('primary'),
				neutral: withPalette('neutral'),
				success: withPalette('success'),
				warning: withPalette('warning'),
				error: withPalette('error'),
				info: withPalette('info'),
			},
			backgroundColor: {
				primary: withPalette('primary'),
				neutral: withPalette('neutral'),
				success: withPalette('success'),
				warning: withPalette('warning'),
				error: withPalette('error'),
				info: withPalette('info'),
			},
			borderColor: {
				primary: withPalette('primary'),
				neutral: withPalette('neutral'),
				success: withPalette('success'),
				warning: withPalette('warning'),
				error: withPalette('error'),
				info: withPalette('info'),
			},
			ringColor: {
				primary: withPalette('primary'),
				neutral: withPalette('neutral'),
				success: withPalette('success'),
				warning: withPalette('warning'),
				error: withPalette('error'),
				info: withPalette('info'),
			},
			gradientColorStops: {
				primary: withPalette('primary'),
				neutral: withPalette('neutral'),
				success: withPalette('success'),
				warning: withPalette('warning'),
				error: withPalette('error'),
				info: withPalette('info'),
			},
		},
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
} satisfies Config
