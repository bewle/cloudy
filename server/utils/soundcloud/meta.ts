export const getTrackMeta = defineCachedFunction(async (url: string) => {
  const logger = getLogger()
  logger.set({ url })

  return $scResolve(url, 'track')
})

export const getUserMeta = defineCachedFunction(async (url: string) => {
  const logger = getLogger()
  logger.set({ url })

  return $scResolve(url, 'user')
})

export const getPlaylistMeta = defineCachedFunction(async (url: string) => {
  const logger = getLogger()
  logger.set({ url })

  return $scResolve(url, 'playlist')
})

export const getUserTracks = defineCachedFunction(
  async (userId: string) => {
    const res = await $scRequest(`/users/${userId}/tracks`, {
      query: {
        limit: 32,
        linked_partitioning: true,
      },
    })

    return parseSc(scTrackSearchSchema, res)
  },
  {
    getKey: (urn: string) => urn,
    maxAge: 60 * 15,
    name: 'sc-user-tracks',
    swr: true,
  },
)

export const getPlaylistTracks = defineCachedFunction(
  async (playlist: SCPlaylist) => {
    const ids = playlist.tracks.map(t => t.id)
    if (!ids.length) return { collection: [], next_href: null }

    const tracks: SCTrack[] = []
    for (const c of chunk(ids, 50)) {
      const res = await $scRequest('/tracks', {
        query: { ids: c.join(',') },
      })
      tracks.push(...parseSc(v.array(scTrackSchema), res))
    }

    return { collection: tracks, next_href: null } satisfies SCTrackSearch
  },
  {
    getKey: (playlist: SCPlaylist) => String(playlist.id),
    maxAge: 60 * 15,
    name: 'sc-playlist-tracks',
    swr: true,
  },
)

export const getUserTracksPage = defineCachedFunction(async (href: string) =>
  parseSc(scTrackSearchSchema, await $scRequest(href)),
)

export const userUrlToId = defineCachedFunction(
  async (url: string) => {
    const meta = await $scResolve(url, 'user')
    return String(meta.id)
  },
  {
    getKey: (url: string) => normalizeURL(url),
    maxAge: 60 * 60 * 24,
    name: 'sc-user-url-to-id',
    swr: true,
  },
)

export const playlistUrlToId = defineCachedFunction(
  async (url: string) => {
    const meta = await $scResolve(url, 'playlist')
    return String(meta.id)
  },
  {
    getKey: (url: string) => normalizeURL(url),
    maxAge: 60 * 60 * 24,
    name: 'sc-playlist-url-to-id',
    swr: true,
  },
)
