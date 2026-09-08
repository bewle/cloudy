const querySchema = v.object({
  nextHref: v.optional(v.string()),
  url: v.optional(v.string()),
})

export default defineEventHandler(async (event): Promise<SCTrackSearchSummary> => {
  const query = validateQuery(event, querySchema)

  if (query.nextHref)
    return summarizeTrackSearch(await getUserTracksPage(assertScHref(query.nextHref)))

  if (isNil(query.url)) throw validationErrors.NOT_ENOUGH_ARTIST_INFO()

  const playlistMeta = await getPlaylistMeta(query.url)
  const search = await getPlaylistTracks(playlistMeta)
  return summarizeTrackSearch(search)
})
