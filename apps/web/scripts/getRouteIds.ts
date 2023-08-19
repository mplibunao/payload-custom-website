import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { z } from 'zod'

const RouteSchema = z.object({
	id: z.string(),
	file: z.string(),
	path: z.string().optional(),
})

type Route = z.infer<typeof RouteSchema> & {
	children?: Route[]
}

const Schema: z.ZodType<Route> = RouteSchema.extend({
	children: z.lazy(() => Schema.array()).optional(),
})

void main()

async function main() {
	let { $ } = await import('execa')

	// We run the script and get the stdout
	console.info(`running npx remix routes --json`)
	let { stdout } = await $`pnpm routeJson`

	// can't run npx probably due to monorepo
	// using an npm script works but results in invalid json and crashes JSON.parse
	// so we clean it manually then parse
	const cleanedOutput = stdout.slice(stdout.indexOf('['))
	const data = JSON.parse(cleanedOutput)
	// We parse the JSON using zod
	const routes = Schema.array().parse(data)
	// We recursively iterate the routes to get the IDs
	let ids = routes.flatMap((route) => iteration(route))

	await writeFile(
		resolve('./src/types/route-id.d.ts'),
		`export type RouteId = ${ids.map((id) => `"${id}"`).join(' | ')}`,
	)
}

// This function receives a route, if it has no children
// it returns the ID, if it has it returns all the IDs
function iteration(route: Route): string | string[] {
	if (!route.children) return route.id
	return [route.id, ...route.children.flatMap((child) => iteration(child))]
}
