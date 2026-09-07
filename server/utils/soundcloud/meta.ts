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

export const getUserTracksPage = defineCachedFunction(
  async (href: string) => parseSc(scTrackSearchSchema, await $scRequest(href)),
  {
    getKey: (href: string) => href,
    maxAge: 60 * 15,
    name: 'sc-user-tracks-page',
    swr: true,
  },
)

export const urlToId = defineCachedFunction(
  async (url: string) => {
    const meta = await $scResolve(url, 'user')
    return String(meta.id)
  },
  {
    getKey: (url: string) => normalizeURL(url),
    maxAge: 60 * 60 * 24,
    name: 'sc-url-to-id',
    swr: true,
  },
)
