import { type Static, Type } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const routeSchema = Type.Recursive((route) =>
	Type.Object({
		id: Type.String(),
		file: Type.String(),
		path: Type.Optional(Type.String()),
		children: Type.Optional(Type.Array(route)),
	}),
)

type Route = Static<typeof routeSchema>

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
	// We parse the JSON using typebox
	const routes = validate(data)
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

function validate(data: unknown) {
	const C = TypeCompiler.Compile(Type.Array(routeSchema))
	const isValid = C.Check(data)
	if (isValid) {
		return data
	}

	throw new Error(
		JSON.stringify(
			[...C.Errors(data)].map(({ path, message }) => ({ path, message })),
		),
	)
}
