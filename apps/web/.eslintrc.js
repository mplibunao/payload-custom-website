/** @type {import("eslint").Linter.Config} */
module.exports = {
	parser: '@typescript-eslint/parser',
	root: true,
	extends: ['custom'],
	parserOptions: {
		project: true,
		tsconfigRootDir: __dirname,
	},
	overrides: [
		{
			files: ['src/cms/payload-types.ts'],
			reportUnusedDisableDirectives: false,
		},
	],
}
