export function useArtistMeta(artistUrl: MaybeRefOrGetter<string | undefined>) {
  const artistUrlRef = toRef(artistUrl)

  const asyncData = useCachedData(
    () => `artist-meta-${artistUrlRef.value}`,
    async () => {
      const url = artistUrlRef.value
      if (!url) return null
      return $fetch('/api/artist/meta', { query: { url } })
    },
  )

  return asyncData
}
