export const useTrackMeta = createGlobalState(() => {
  const metas = shallowReactive(new Map<string /* url */, SCTrackSummary>())

  function setTrackMeta(tracks: Iterable<SCTrackSummary | SCTrackStub>) {
    if (import.meta.server) return

    for (const t of tracks) {
      if (isTrackSummary(t)) metas.set(t.permalink_url, t)
    }
  }

  function getTrackMeta(url: string) {
    return metas.get(url)
  }

  return { getTrackMeta, metas, setTrackMeta }
})
