const querySchema = v.object({
  url: v.pipe(v.string(), v.url()),
})

export default defineEventHandler(async (event): Promise<SCTrackSummary> => {
  const query = validateQuery(event, querySchema)
  const meta = await getTrackMeta(query.url)
  return pick(meta, SC__TRACK_SUMMARY_KEYS)
})
