interface ArtistTracksPages {
  nextHref?: string
  tracks: SCTrackSummary[]
  url?: string
}

const NO_TRACKS: ArtistTracksPages = { nextHref: undefined, tracks: [], url: undefined }

export function useArtistTracks(artistUrl: MaybeRefOrGetter<string | undefined>) {
  const artistUrlRef = toRef(artistUrl)

  const { pending: artistMetaPending } = useArtistMeta(artistUrl)

  const { data, pending, refresh } = useCachedData(
    () => `artist-tracks-${artistUrlRef.value}`,
    async (nuxtApp, { signal }) => {
      const url = artistUrlRef.value
      if (!url) return NO_TRACKS

      const prev = nuxtApp.payload.data[`artist-tracks-${url}`] as ArtistTracksPages | undefined
      if (prev?.tracks.length && !prev.nextHref) return { ...prev, url }

      const { collection, next_href } = await $fetch<SCTrackSearchSummary>('/api/artist/tracks', {
        query: prev?.nextHref ? { nextHref: prev.nextHref } : { url },
        signal,
      })

      return {
        nextHref: next_href ?? undefined,
        tracks: [...(prev?.tracks ?? []), ...(collection as SCTrackSummary[])],
        url,
      }
    },
    {
      default: (): ArtistTracksPages => ({ tracks: [] }),
      getCachedData: (key, nuxtApp, { cause }) =>
        // skip cache if manual
        cause === 'refresh:manual'
          ? undefined
          : ((nuxtApp.payload.data[key] ?? nuxtApp.static.data[key]) as
              | ArtistTracksPages
              | undefined),
    },
  )

  const current = computed(() => (data.value.url === artistUrlRef.value ? data.value : NO_TRACKS))

  const canLoadMore = computed(() => !!current.value.nextHref)
  const isLoading = computed(() => pending.value || artistMetaPending.value)
  const loadNextHref = () => void refresh()
  const items = computed(() => current.value.tracks.filter(isTrackSummary).map(toReadyTrackRow))

  return {
    canLoadMore,
    isLoading,
    items,
    loadNextHref,
  } satisfies TrackSource
}
