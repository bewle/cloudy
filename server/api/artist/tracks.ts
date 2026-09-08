const querySchema = v.object({
  nextHref: v.optional(v.string()),
  url: v.optional(v.string()),
  userId: v.optional(v.string()),
})

export default defineEventHandler(async (event): Promise<SCTrackSearchSummary> => {
  const query = validateQuery(event, querySchema)

  if (query.nextHref)
    return summarizeTrackSearch(await getUserTracksPage(assertScHref(query.nextHref)))

  if (isNil(query.url) && isNil(query.userId)) throw validationErrors.NOT_ENOUGH_ARTIST_INFO()

  const userId = query.userId ?? (query.url ? await userUrlToId(query.url) : undefined)
  if (!userId) throw validationErrors.NOT_ENOUGH_ARTIST_INFO()

  const search = await getUserTracks(userId)
  return summarizeTrackSearch(search)
})
