export function useArtistTracks(artistUrl: MaybeRefOrGetter<string | undefined>) {
  const artistUrlRef = toRef(artistUrl)
  const asyncData = useCachedData(
    () => `artist-tracks:${artistUrlRef.value}`,
    async () => {
      if (!artistUrlRef.value) return

      return await $fetch<SCTrackSearchSummary>('/api/track', {
        query: {
          url: artistUrlRef.value,
        },
      })
    },
    { watch: [artistUrlRef] },
  )
  return asyncData
}
