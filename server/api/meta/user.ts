const querySchema = v.object({
  url: v.pipe(v.string(), v.url()),
})

export default defineEventHandler(async (event): Promise<SCUserSummary> => {
  const query = validateQuery(event, querySchema)

  const meta = await getUserMeta(query.url)
  return pick(meta, SC__USER_SUMMARY_KEYS)
})
