type MultitrackEntry =
  | { status: 'pending' }
  | { status: 'ready'; track: SCTrackSummary }
  | { error: Error; status: 'error' }

export function useMultitrackMeta(multitrackUrls: MaybeRefOrGetter<Set<string>>) {
  const multitrackUrlsRef = toRef(multitrackUrls)

  const entries = shallowReactive(new Map<string, MultitrackEntry>())

  const load = (url: string) => {
    entries.set(url, { status: 'pending' })
    $fetch<SCTrackSummary>('/api/track/meta', { query: { url } })
      .then(track => entries.set(url, { status: 'ready', track }))
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

      if (entry?.status === 'ready') return { status: 'ready', track: entry.track, url }
      if (entry?.status === 'error') return { error: entry.error, status: 'error', url }
      return { status: 'pending', url }
    }),
  )

  const isLoading = computed(() =>
    [...multitrackUrlsRef.value].some(url => entries.get(url)?.status === 'pending'),
  )

  return {
    canLoadMore: ref(false),
    isLoading,
    items,
    loadNextHref: noop,
    retry: load,
  } satisfies TrackSource
}
