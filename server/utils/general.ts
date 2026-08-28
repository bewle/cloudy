import type { FieldContext } from 'evlog'
import type { EventHandlerRequest, H3Event } from 'h3'
import type { GenericSchema } from 'valibot'

export function getLogger() {
  const event = useEvent()
  return useLogger(event)
}

export function setOperation(operation: string, context?: FieldContext) {
  const logger = getLogger()

  logger.set({
    operation,
    ...context,
  })
}

export function validateQuery<TSchema extends GenericSchema>(
  event: H3Event<EventHandlerRequest>,
  schema: TSchema,
) {
  const query = getQuery(event)
  const { success, output, issues } = v.safeParse(schema, query)
  if (!success)
    throw validationErrors.INVALID_URL({
      internal: {
        issues,
      },
      option: 'track',
    })

  return output
}
