const querySchema = v.object({
  url: v.optional(v.string()),
})

export default defineEventHandler(async (event): Promise<SCTrackSearchSummary> => {
  const query = validateQuery(event, querySchema)

  if (isNil(query.url)) throw validationErrors.NOT_ENOUGH_PLAYLIST_INFO()

  const playlistMeta = await getPlaylistMeta(query.url)
  const search = await getPlaylistTracks(playlistMeta)
  return summarizeTrackSearch(search)
})
