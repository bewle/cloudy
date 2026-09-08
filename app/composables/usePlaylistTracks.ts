export function usePlaylistTracks(playlistUrl: MaybeRefOrGetter<string | undefined>) {
  const playlistUrlRef = toRef(playlistUrl)

  const { data: playlistMeta, pending: playlistMetaPending } = usePlaylistMeta(playlistUrl)

  const { data: tracks, pending } = useCachedData(
    () => `playlist-tracks-${playlistUrlRef.value}`,
    async (_nuxtApp, { signal }) => {
      const url = playlistUrlRef.value
      if (!url) return []

      await until(playlistMetaPending).toBe(false)
      if (!playlistMeta.value?.track_count) return []

      const { collection } = await $fetch<SCTrackSearchSummary>('/api/playlist/tracks', {
        query: { url },
        signal,
      })

      return collection as SCTrackSummary[]
    },
    { default: () => [] },
  )

  const isLoading = computed(() => pending.value || playlistMetaPending.value)

  return {
    // only one response
    canLoadMore: ref(false),
    isLoading,
    loadNextHref: noop,
    tracks,
  }
}
