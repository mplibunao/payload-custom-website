export type Ok<Value> = { type: 'ok'; value: Value }
export type Err<ErrorType extends string> = {
	type: 'error'
	message: string
	error: ErrorType
}

export type Result<Value, ErrorType extends string> = Ok<Value> | Err<ErrorType>

export function ok<Value>(value: Value): Ok<Value> {
	return { type: 'ok', value }
}

export const isOk = <Value, ErrorType extends string>(
	result: Result<Value, ErrorType>,
): result is Ok<Value> => {
	return result.type === 'ok'
}

export function err<ErrorType extends string>(
	error: ErrorType,
	message: string,
): Err<ErrorType> {
	return { type: 'error', error, message }
}

export const isErr = <Value, ErrorType extends string>(
	result: Result<Value, ErrorType>,
): result is Err<ErrorType> => result.type === 'error'
