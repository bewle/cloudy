const querySchema = v.object({
  url: v.pipe(v.string(), v.url()),
})

export default defineEventHandler(async (event): Promise<string> => {
  const query = validateQuery(event, querySchema)
  return getTrackStreamUrl(query.url)
})
