interface ArtistTracksPages {
  nextHref?: string
  tracks: SCTrackSummary[]
}

const NO_TRACKS = { nextHref: undefined, tracks: [] }

export function useArtistTracks(artistUrl: MaybeRefOrGetter<string | undefined>) {
  const artistUrlRef = toRef(artistUrl)

  const { data: artistMeta, pending: artistMetaPending } = useArtistMeta(artistUrl)

  const { data, pending, refresh } = useCachedData(
    () => `artist-tracks-${artistUrlRef.value}`,
    async (nuxtApp, { signal }) => {
      const url = artistUrlRef.value
      if (!url) return NO_TRACKS

      await until(artistMetaPending).toBe(false)
      if (!artistMeta.value?.track_count) return NO_TRACKS

      const prev = nuxtApp.payload.data[`artist-tracks-${url}`] as ArtistTracksPages | undefined
      if (prev?.tracks.length && !prev.nextHref) return prev

      const { collection, next_href } = await $fetch<SCTrackSearchSummary>('/api/artist/tracks', {
        query: prev?.nextHref ? { nextHref: prev.nextHref } : { url },
        signal,
      })

      return {
        nextHref: next_href ?? undefined,
        tracks: [...(prev?.tracks ?? []), ...(collection as SCTrackSummary[])],
      }
    },
    {
      default: () => NO_TRACKS,
      getCachedData: (key, nuxtApp, { cause }) =>
        // skip cache if manual
        cause === 'refresh:manual'
          ? undefined
          : ((nuxtApp.payload.data[key] ?? nuxtApp.static.data[key]) as
              | ArtistTracksPages
              | undefined),
    },
  )

  const canLoadMore = computed(() => !!data.value.nextHref)
  const isLoading = computed(() => pending.value || artistMetaPending.value)
  const loadNextHref = () => void refresh()
  const tracks = computed(() => data.value.tracks)

  return {
    canLoadMore,
    isLoading,
    loadNextHref,
    tracks,
  }
}
