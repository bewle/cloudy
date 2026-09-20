export const useTrackMeta = createGlobalState(() => {
  const metas = shallowReactive(new Map<string /* url */, SCTrackSummary>())

  function setTrackMetaFor(url: string, track: SCTrackSummary) {
    if (import.meta.server) return

    metas.set(url, track)
    metas.set(track.permalink_url, track)
  }

  function setTrackMeta(tracks: Iterable<SCTrackSummary | SCTrackStub>) {
    for (const t of tracks) {
      if (isTrackSummary(t)) setTrackMetaFor(t.permalink_url, t)
    }
  }

  function getTrackMeta(url: string) {
    return metas.get(url)
  }

  return { getTrackMeta, metas, setTrackMeta, setTrackMetaFor }
})
