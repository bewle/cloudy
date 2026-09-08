const artistTracksCache = new Map<string, { tracks: SCTrackSummary[]; nextHref?: string }>()

export function useArtistTracks(artistUrl: MaybeRefOrGetter<string | undefined>) {
  const artistUrlRef = toRef(artistUrl)
  const tracks = shallowRef(artistTracksCache.get(artistUrlRef.value ?? '')?.tracks ?? [])

  const nextHref = ref(artistTracksCache.get(artistUrlRef.value ?? '')?.nextHref)

  const { data: artistMeta, pending: artistMetaPending } = useArtistMeta(artistUrl)

  const canLoadMore = computed(() =>
    Boolean(
      !artistMetaPending.value &&
      artistUrlRef.value &&
      (!!nextHref.value || !tracks.value.length) &&
      !!artistMeta.value?.track_count &&
      tracks.value.length <= artistMeta.value.track_count,
    ),
  )

  const asyncState = useAsyncState(
    async () => {
      await until(artistMetaPending).toBe(false)
      if (!canLoadMore.value || !artistUrlRef.value) return

      const query = !tracks.value.length
        ? { url: artistUrlRef.value }
        : !!tracks.value.length && nextHref.value
          ? { nextHref: nextHref.value }
          : undefined

      if (!query) return

      const { collection, next_href } = await $fetch<SCTrackSearchSummary>('/api/artist/tracks', {
        query,
      })

      const newTracks = [...tracks.value, ...(collection as SCTrackSummary[])]
      const newNextHref = next_href ?? undefined

      artistTracksCache.set(artistUrlRef.value, {
        nextHref: newNextHref,
        tracks: newTracks,
      })

      tracks.value = newTracks
      nextHref.value = newNextHref
    },
    undefined,
    { immediate: false },
  )

  const isLoading = computed(() => asyncState.isLoading.value || artistMetaPending.value)

  watch(
    artistUrlRef,
    () => {
      tracks.value = getCachedTracks()
      nextHref.value = getCachedNextHref()

      if (!tracks.value.length) load()
    },
    { immediate: true },
  )

  function load() {
    if (!asyncState.isLoading.value) void asyncState.executeImmediate()
  }

  function getCachedTracks() {
    return artistTracksCache.get(artistUrlRef.value ?? '')?.tracks ?? []
  }
  function getCachedNextHref() {
    return artistTracksCache.get(artistUrlRef.value ?? '')?.nextHref
  }

  return {
    canLoadMore,
    isLoading,
    loadNextHref: load,
    tracks,
  }
}
