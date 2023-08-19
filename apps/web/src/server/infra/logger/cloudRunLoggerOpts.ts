/* eslint-disable */
import { type LoggerOptions } from 'pino'
import { z } from 'zod'
import { NODE_ENV } from '~/shared/schemas'

export const cloudRunLoggerOptsEnvSchema = {
	K_SERVICE: z.string().optional(),
	APP_NAME: z.string(),
	APP_VERSION: z.string().default('0.0.0'),
	LOGGING_LEVEL: z
		.union([
			z.literal('fatal'),
			z.literal('error'),
			z.literal('warn'),
			z.literal('info'),
			z.literal('debug'),
			z.literal('trace'),
		])
		.default('info'),
	NODE_ENV,
}

const loggerOptsSchema = z.object(cloudRunLoggerOptsEnvSchema)

export type CloudRunLoggerOpts = z.infer<typeof loggerOptsSchema>

interface ErrorReportingFields {
	'@type': string
	serviceContext: {
		service: string
		version?: string
	}
}

export const getCloudRunLoggerConfig = (
	opts: CloudRunLoggerOpts,
): Partial<LoggerOptions> => {
	if (opts.K_SERVICE) {
		// https://cloud.google.com/error-reporting/docs/formatting-error-messages
		const errorReportingFields: ErrorReportingFields = {
			'@type':
				'type.googleapis.com/google.devtools.clouderrorreporting.v1beta1.ReportedErrorEvent',
			serviceContext: {
				service: opts.APP_NAME,
			},
		}
		if (opts.APP_VERSION) {
			errorReportingFields.serviceContext.version = opts.APP_VERSION
		}

		return {
			name: opts.APP_NAME,
			level: 'info',
			messageKey: 'message',
			timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
			formatters: {
				// https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#LogSeverity
				level(label: string, _number: number): object {
					switch (label) {
						case 'debug':
						case 'info':
							return { severity: label.toUpperCase() }
						case 'error':
							return { severity: label.toUpperCase(), ...errorReportingFields }
						case 'warn':
							return { severity: 'WARNING' }
						case 'fatal':
							return { severity: 'CRITICAL', ...errorReportingFields }
						default:
							return { severity: 'DEFAULT' }
					}
				},
				bindings(_bindings) {
					return {}
				},

				log(obj: any): any {
					const { req, res, responseTime, ...driver } = obj
					// https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#HttpRequest
					// https://cloud.google.com/logging/docs/structured-logging
					if (req != null) {
						driver.httpRequest = driver.httpRequest || {}
						driver.httpRequest.requestMethod = req.method
						driver.httpRequest.requestUrl =
							(req.raw.socket.encrypted ? 'https://' : 'http://') +
							req.hostname +
							req.url
						driver.httpRequest.remoteIp = req.ips?.[0] ?? req.ip
						driver.httpRequest.userAgent = req.headers['user-agent']
					}

					if (res != null) {
						driver.httpRequest = driver.httpRequest || {}
						driver.httpRequest.status = res.statusCode
						driver.httpRequest.latency = responseTime / 1000

						//https://github.com/googleapis/nodejs-logging/issues/875#issuecomment-1631102179
						driver.httpRequest.requestMethod = res.request.method
						driver.httpRequest.requestUrl = res.request.url
						driver.httpRequest.userAgent = res.request.headers['user-agent']
						driver.httpRequest.remoteIp = res.request.ips?.[0] ?? res.request.ip
						driver.httpRequest.protocol = res.request.protocol
					}

					return driver
				},
			},
		}
	}

	if (opts.NODE_ENV === 'production') {
		return {
			name: opts.APP_NAME,
			level: opts.LOGGING_LEVEL,
		}
	}

	return {
		name: opts.APP_NAME,
		level: opts.LOGGING_LEVEL,
		transport: {
			target: 'pino-pretty',
			options: {
				translateTime: 'HH:MM:ss Z',
				ignore: 'pid,hostname',
			},
		},
	}
}
