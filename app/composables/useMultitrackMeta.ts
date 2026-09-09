type MultitrackEntry =
  | { status: 'pending' }
  | { status: 'ready'; track: SCTrackSummary }
  | { error: Error; status: 'error' }

export type TrackRow =
  | { key: string; status: 'pending' }
  | { key: string; status: 'ready'; track: SCTrackSummary }
  | { error: Error; key: string; status: 'error'; url: string }

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

      if (entry?.status === 'ready') return { key: url, status: 'ready', track: entry.track }
      if (entry?.status === 'error') return { error: entry.error, key: url, status: 'error', url }
      return { key: url, status: 'pending' }
    }),
  )

  return {
    canLoadMore: ref(false),
    isLoading: computed(() =>
      [...multitrackUrlsRef.value].some(url => entries.get(url)?.status === 'pending'),
    ),
    items,
    loadNextHref: noop,
    retry: load,
    tracks: computed(() => items.value.flatMap(row => (row.status === 'ready' ? [row.track] : []))),
  }
}
