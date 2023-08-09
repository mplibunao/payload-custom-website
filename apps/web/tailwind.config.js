const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/app/**/*.{tsx,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				antique: 'var(--antique)',
				white: 'var(--white)',
				gray: 'var(--gray)',
				red: 'var(--red)',
				blue: 'var(--blue)',
				yellow: 'var(--yellow)',
				orange: 'var(--orange)',
			},
			textColor: {
				antique: 'var(--antique)',
				white: 'var(--white)',
				gray: 'var(--gray)',
				red: 'var(--red)',
				blue: 'var(--blue)',
				yellow: 'var(--yellow)',
				orange: 'var(--orange)',
			},
			backgroundColor: {
				antique: 'var(--antique)',
				white: 'var(--white)',
				gray: 'var(--gray)',
				red: 'var(--red)',
				blue: 'var(--blue)',
				yellow: 'var(--yellow)',
				orange: 'var(--orange)',
			},
			borderColor: {
				antique: 'var(--antique)',
				white: 'var(--white)',
				gray: 'var(--gray)',
				red: 'var(--red)',
				blue: 'var(--blue)',
				yellow: 'var(--yellow)',
				orange: 'var(--orange)',
			},
			ringColor: {
				antique: 'var(--antique)',
				white: 'var(--white)',
				gray: 'var(--gray)',
				red: 'var(--red)',
				blue: 'var(--blue)',
				yellow: 'var(--yellow)',
				orange: 'var(--orange)',
			},
			gradientColorStops: {
				antique: 'var(--antique)',
				white: 'var(--white)',
				gray: 'var(--gray)',
				red: 'var(--red)',
				blue: 'var(--blue)',
				yellow: 'var(--yellow)',
				orange: 'var(--orange)',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
