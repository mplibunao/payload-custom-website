/// <reference types="vitest" />

import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { react } from './tests/setup/vitejs-plugin-react.cjs'

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	css: { postcss: { plugins: [] } },
	test: {
		include: ['./app/**/*.test.{ts,tsx}'],
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
			forceRerunTriggers: [
				'**/package.json/**',
				//'**vitest.config.*/**',
				'src/**/*.ts',
			],
			open: false,
		},
	},
	mode: 'test',
})
