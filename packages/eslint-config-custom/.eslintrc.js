/** @type {import("eslint").Linter.Config} */
const config = {
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'vitest', 'testing-library', 'only-warn'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'prettier',
		'plugin:testing-library/react',
		'plugin:vitest/recommended',
		'@remix-run/eslint-config',
		'@remix-run/eslint-config/node',
	],
	rules: {
		'no-useless-constructor': 'off',
		'testing-library/no-unnecessary-act': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
			},
		],
		'@typescript-eslint/no-non-null-assertion': 'warn',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{
				prefer: 'type-imports',
				fixStyle: 'inline-type-imports',
			},
		],
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-unsafe-assignment': 'warn',
		'max-lines': ['error', { max: 600 }],
		'max-params': ['error', { max: 4 }],
		'max-statements': ['error', { max: 15 }],
		complexity: ['error', { max: 20 }],
		'@typescript-eslint/switch-exhaustiveness-check': 'error',
		'import/no-duplicates': 'warn',
	},
	overrides: [
		{
			files: ['*.test.ts', '*.spec.ts', '*.test.tsx', '*.spec.tsx'],
			rules: {
				'@typescript-eslint/no-non-null-assertion': 'off',
				'max-statements': ['off'],
			},
		},
		{
			plugins: ['remix-react-routes'],
			files: ['src/app/**'],
			excludedFiles: ['src/app/**/*.{test,spec}'],
			rules: {
				'remix-react-routes/use-link-for-routes': 'error',
				'remix-react-routes/require-valid-paths': 'error',
				// disable this one because it doesn't appear to work with our
				// route convention. Someone should dig deeper into this...
				'remix-react-routes/no-relative-paths': [
					'off',
					{ allowLinksToSelf: true },
				],
				'remix-react-routes/no-urls': 'error',
				'no-restricted-imports': [
					'error',
					{
						patterns: [
							{
								group: ['src/app/**/*.{test,spec}'],
								message: 'Do not import test files in app files',
							},
						],
					},
				],
			},
		},
		{
			extends: ['@remix-run/eslint-config/jest-testing-library'],
			files: ['src/**/*.{test,spec}'],
			rules: {
				'testing-library/no-await-sync-events': 'off',
				'jest-dom/prefer-in-document': 'off',
			},
			// we're using vitest which has a very similar API to jest
			// (so the linting plugins work nicely), but it means we have to explicitly
			// set the jest version.
			settings: {
				jest: {
					version: 28,
				},
			},
		},
	],
	reportUnusedDisableDirectives: true,
}

module.exports = config
