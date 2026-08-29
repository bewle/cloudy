export const useTrackDownload = (url: MaybeRefOrGetter<string>) => {
  const urlRef = toRef(url)
  const progress = ref(0)

  const asyncData = useAsyncData(
    async () => {
      try {
        const trackMeta = await getTrackMeta(urlRef.value)

        const { buffer, mime, extension } = await getTrackBuffer(
          urlRef.value,
          p => (progress.value = p),
        )
        const trackBlob = bufferToBlob(buffer, mime)

        saveAs(trackBlob, mime, getTrackFilename(trackMeta, extension))
      } finally {
        progress.value = 0
      }
    },
    {
      immediate: false,
    },
  )

  return { ...asyncData, progress }
}
