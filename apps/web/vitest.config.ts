/// <reference types="vitest" />

import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [tsconfigPaths()],
	css: { postcss: { plugins: [] } },
	test: {
		include: ['./src/**/*.test.{ts,tsx}'],
		environment: 'jsdom',
		coverage: {
			include: ['src/app/**/*.{ts,tsx}'],
			all: true,
			exclude: [
				'src/server/index.ts',
				'src/types/**/*.ts',
				'src/tests/**/*',
				'src/**/*.{spec,test}.{ts,tsx}',
			],
		},
		passWithNoTests: true,
	},
	mode: 'test',
})
