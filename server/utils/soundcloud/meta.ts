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
