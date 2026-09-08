const playlistTracksCache = new Map<string, SCTrackSummary[]>()

export function usePlaylistTracks(playlistUrl: MaybeRefOrGetter<string | undefined>) {
  const playlistUrlRef = toRef(playlistUrl)
  const tracks = shallowRef(playlistTracksCache.get(playlistUrlRef.value ?? '') ?? [])

  const { data: playlistMeta, pending: playlistMetaPending } = usePlaylistMeta(playlistUrl)

  const canLoadMore = computed(() =>
    Boolean(
      !playlistMetaPending.value &&
      playlistUrlRef.value &&
      !tracks.value.length &&
      !!playlistMeta.value?.track_count &&
      tracks.value.length <= playlistMeta.value.track_count,
    ),
  )

  const asyncState = useAsyncState(
    async () => {
      await until(playlistMetaPending).toBe(false)
      if (!canLoadMore.value || !playlistUrlRef.value) return

      const query = !tracks.value.length ? { url: playlistUrlRef.value } : undefined

      if (!query) return

      const { collection } = await $fetch<SCTrackSearchSummary>('/api/playlist/tracks', {
        query,
      })

      const newTracks = [...tracks.value, ...(collection as SCTrackSummary[])]

      playlistTracksCache.set(playlistUrlRef.value, newTracks)

      tracks.value = newTracks
    },
    undefined,
    { immediate: false },
  )

  const isLoading = computed(() => asyncState.isLoading.value || playlistMetaPending.value)

  watch(
    playlistUrlRef,
    () => {
      tracks.value = getCachedTracks()

      if (!tracks.value.length) load()
    },
    { immediate: true },
  )

  function load() {
    if (!asyncState.isLoading.value) void asyncState.executeImmediate()
  }

  function getCachedTracks() {
    return playlistTracksCache.get(playlistUrlRef.value ?? '') ?? []
  }

  return {
    canLoadMore,
    isLoading,
    loadNextHref: load,
    tracks,
  }
}
