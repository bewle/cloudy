export function usePlaylistMeta(playlistUrl: MaybeRefOrGetter<string | undefined>) {
  const playlistUrlRef = toRef(playlistUrl)

  const asyncData = useCachedData(
    () => `playlist-meta-${playlistUrlRef.value}`,
    async () => {
      const url = playlistUrlRef.value
      if (!url) return null
      return $fetch('/api/meta/playlist', { query: { url } })
    },
  )

  return asyncData
}
