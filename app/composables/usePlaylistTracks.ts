interface PlaylistTracks {
  tracks: SCTrackSummary[]
  url?: string
}

const NO_TRACKS: PlaylistTracks = { tracks: [], url: undefined }

export function usePlaylistTracks(playlistUrl: MaybeRefOrGetter<string | undefined>) {
  const playlistUrlRef = toRef(playlistUrl)

  const { pending: playlistMetaPending } = usePlaylistMeta(playlistUrl)

  const { data, pending } = useCachedData(
    () => `playlist-tracks-${playlistUrlRef.value}`,
    async (_nuxtApp, { signal }) => {
      const url = playlistUrlRef.value
      if (!url) return NO_TRACKS

      const { collection } = await $fetch<SCTrackSearchSummary>('/api/playlist/tracks', {
        query: { url },
        signal,
      })

      return { tracks: collection as SCTrackSummary[], url }
    },
    { default: (): PlaylistTracks => ({ tracks: [] }) },
  )

  const isLoading = computed(() => pending.value || playlistMetaPending.value)
  const tracks = computed(() =>
    data.value.url === playlistUrlRef.value ? data.value.tracks : NO_TRACKS.tracks,
  )

  return {
    // only one response
    canLoadMore: ref(false),
    isLoading,
    loadNextHref: noop,
    tracks,
  }
}
