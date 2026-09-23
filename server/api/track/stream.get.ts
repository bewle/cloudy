const querySchema = v.object({
  format: v.optional(v.picklist(SC__TRANSCODINGS), 'mp3'),
  url: v.pipe(v.string(), v.url()),
})

export default defineEventHandler(async (event): Promise<string> => {
  const query = validateQuery(event, querySchema)
  return getTrackStreamUrl(query.url, query.format)
})
