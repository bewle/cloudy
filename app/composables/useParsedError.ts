import type { ParsedError } from 'evlog'

export const useParsedError = (error: MaybeRefOrGetter<Error | undefined>) => {
  const { t } = useI18n()
  const errorRef = toRef(error)

  return computed(() => {
    if (!errorRef.value) return

    const parsed = parseError(errorRef.value)
    if ('why' in parsed) return parsed

    const status =
      'statusCode' in errorRef.value && isNumber(errorRef.value.statusCode)
        ? errorRef.value.statusCode
        : 500
    return {
      message: t('error.unexpected'),
      raw: errorRef.value,
      status,
      why: errorRef.value?.message,
    } satisfies ParsedError
  })
}
