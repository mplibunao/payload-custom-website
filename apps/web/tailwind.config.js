const defaultTheme = require('tailwindcss/defaultTheme')

function hslWithOpacity(variableName) {
	return `hsl(var(${variableName}) / <alpha-value>)`
}

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/app/**/*.{tsx,ts}', 'src/cms/**/*.{tsx,ts}'],
	darkMode: 'class',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			fontFamily: {
				sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				antique: hslWithOpacity('--antique'),
				white: hslWithOpacity('--white'),
				gray: hslWithOpacity('--gray'),
				lightGray: hslWithOpacity('--light-gray'),
				highlightGray: hslWithOpacity('--highlight-gray'),
				red: hslWithOpacity('--red'),
				blue: hslWithOpacity('--blue'),
				yellow: hslWithOpacity('--yellow'),
				orange: hslWithOpacity('--orange'),

				// shadcn
				border: hslWithOpacity('--border'),
				input: hslWithOpacity('--input'),
				ring: hslWithOpacity('--ring'),
				background: hslWithOpacity('--background'),
				foreground: hslWithOpacity('--foreground'),
				primary: {
					DEFAULT: hslWithOpacity('--primary'),
					foreground: hslWithOpacity('--primary-foreground'),
				},
				secondary: {
					DEFAULT: hslWithOpacity('--secondary'),
					foreground: hslWithOpacity('--secondary-foreground'),
				},
				destructive: {
					DEFAULT: hslWithOpacity('--destructive'),
					foreground: hslWithOpacity('--destructive-foreground'),
				},
				muted: {
					DEFAULT: hslWithOpacity('--muted'),
					foreground: hslWithOpacity('--muted-foreground'),
				},
				accent: {
					DEFAULT: hslWithOpacity('--accent'),
					foreground: hslWithOpacity('--accent-foreground'),
				},
				popover: {
					DEFAULT: hslWithOpacity('--popover'),
					foreground: hslWithOpacity('--popover-foreground'),
				},
				card: {
					DEFAULT: hslWithOpacity('--card'),
					foreground: hslWithOpacity('--card-foreground'),
				},
			},
			textColor: {
				antique: hslWithOpacity('--antique'),
				white: hslWithOpacity('--white'),
				gray: hslWithOpacity('--gray'),
				lightGray: hslWithOpacity('--light-gray'),
				highlightGray: hslWithOpacity('--highlight-gray'),
				red: hslWithOpacity('--red'),
				blue: hslWithOpacity('--blue'),
				yellow: hslWithOpacity('--yellow'),
				orange: hslWithOpacity('--orange'),
			},
			backgroundColor: {
				antique: hslWithOpacity('--antique'),
				white: hslWithOpacity('--white'),
				gray: hslWithOpacity('--gray'),
				lightGray: hslWithOpacity('--light-gray'),
				highlightGray: hslWithOpacity('--highlight-gray'),
				red: hslWithOpacity('--red'),
				blue: hslWithOpacity('--blue'),
				yellow: hslWithOpacity('--yellow'),
				orange: hslWithOpacity('--orange'),
			},
			borderColor: {
				antique: hslWithOpacity('--antique'),
				white: hslWithOpacity('--white'),
				gray: hslWithOpacity('--gray'),
				lightGray: hslWithOpacity('--light-gray'),
				highlightGray: hslWithOpacity('--highlight-gray'),
				red: hslWithOpacity('--red'),
				blue: hslWithOpacity('--blue'),
				yellow: hslWithOpacity('--yellow'),
				orange: hslWithOpacity('--orange'),
			},
			ringColor: {
				antique: hslWithOpacity('--antique'),
				white: hslWithOpacity('--white'),
				gray: hslWithOpacity('--gray'),
				lightGray: hslWithOpacity('--light-gray'),
				highlightGray: hslWithOpacity('--highlight-gray'),
				red: hslWithOpacity('--red'),
				blue: hslWithOpacity('--blue'),
				yellow: hslWithOpacity('--yellow'),
				orange: hslWithOpacity('--orange'),
			},
			gradientColorStops: {
				antique: hslWithOpacity('--antique'),
				white: hslWithOpacity('--white'),
				gray: hslWithOpacity('--gray'),
				lightGray: hslWithOpacity('--light-gray'),
				highlightGray: hslWithOpacity('--highlight-gray'),
				red: hslWithOpacity('--red'),
				blue: hslWithOpacity('--blue'),
				yellow: hslWithOpacity('--yellow'),
				orange: hslWithOpacity('--orange'),
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [
		require('tailwindcss-animate'),
		require('@tailwindcss/typography'),
		require('./tailwindcss-extend.cjs'),
	],
}
