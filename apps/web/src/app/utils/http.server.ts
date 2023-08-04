export function NotFound(message: string) {
	return new Response(message, { status: 404 })
}

export function NotAllowedMethod(message: string) {
	return new Response(message, { status: 405 })
}
