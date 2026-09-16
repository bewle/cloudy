export const useTrackDownload = (url: MaybeRefOrGetter<string>) => {
  const urlRef = toRef(url)
  const progress = ref(0)

  const { getTrackMeta: getCachedTrackMeta, setTrackMetaFor } = useTrackMeta()

  const asyncState = useAsyncState(
    async () => {
      try {
        const cached = getCachedTrackMeta(urlRef.value)
        const trackMeta = cached ?? (await getTrackMeta(urlRef.value))
        if (!cached) setTrackMetaFor(urlRef.value, trackMeta)

        const trackBuffer = await getTrackBuffer(
          urlRef.value,
          (i, total) => (progress.value = i / total),
        )
        const taggedTrackBlob = await getTaggedTrackBuffer(trackBuffer, trackMeta, [
          'APIC',
          'COMM',
          'TDAT',
          'TIT2',
          'TPE1',
          'WOAS',
        ])
        const mime = transcodingToMime('mp3')
        const extension = transcodingToExt('mp3')

        saveAs(taggedTrackBlob, mime, getTrackFilename(trackMeta, extension))
      } finally {
        progress.value = 0
      }
    },
    undefined,
    {
      immediate: false,
    },
  )

  return {
    downloadTrack: asyncState.execute,
    error: asyncState.error as Ref<Error | undefined>,
    isDownloading: asyncState.isLoading,
    progress,
  }
}
