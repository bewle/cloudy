const querySchema = v.object({
  url: v.pipe(v.string(), v.url()),
})

export default defineEventHandler(async event => {
  const query = validateQuery(event, querySchema)

  const meta = await getPlaylistMeta(query.url)
  const picked = pick(meta, SC__PLAYLIST_SUMMARY_KEYS)
  return { ...picked, tracks: summarizeTracks(picked.tracks) }
})
