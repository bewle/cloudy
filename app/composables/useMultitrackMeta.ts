type MultitrackEntry =
  | { status: 'pending' }
  | { status: 'ready' }
  | { error: Error; status: 'error' }

export function useMultitrackMeta(multitrackUrls: MaybeRefOrGetter<Set<string>>) {
  const multitrackUrlsRef = toRef(multitrackUrls)

  const { getTrackMeta: getCachedTrackMeta, setTrackMetaFor } = useTrackMeta()

  const entries = shallowReactive(new Map<string, MultitrackEntry>())

  const load = (url: string) => {
    if (getCachedTrackMeta(url)) {
      entries.set(url, { status: 'ready' })
      return
    }

    entries.set(url, { status: 'pending' })
    $fetch<SCTrackSummary>('/api/track/meta', { query: { url } })
      .then(track => {
        setTrackMetaFor(url, track)
        entries.set(url, { status: 'ready' })
      })
      .catch((error: Error) => entries.set(url, { error, status: 'error' }))
  }

  watch(
    () => [...multitrackUrlsRef.value],
    urls => {
      for (const url of urls) if (!entries.has(url)) load(url)
    },
    { immediate: true },
  )

  const items = computed(() =>
    Array.from(multitrackUrlsRef.value, (url): TrackRow => {
      const entry = entries.get(url)

      const track = entry?.status === 'ready' ? getCachedTrackMeta(url) : undefined
      if (track) return { status: 'ready', track, url }
      if (entry?.status === 'error') return { error: entry.error, status: 'error', url }
      return { status: 'pending', url }
    }),
  )

  const isLoading = computed(() =>
    [...multitrackUrlsRef.value].some(url => entries.get(url)?.status === 'pending'),
  )

  return {
    canLoadMore: ref(false),
    error: ref(),
    isLoading,
    items,
    loadNextHref: noop,
  } satisfies TrackSource
}
