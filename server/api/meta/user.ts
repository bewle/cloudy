const querySchema = v.object({
  url: v.pipe(v.string(), v.url()),
})

export default defineEventHandler(async event => {
  const query = validateQuery(event, querySchema)
  return getUserMeta(query.url)
})
