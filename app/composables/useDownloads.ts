import { downloadZip, type InputWithSizeMeta } from 'client-zip'

export type DownloadEntry =
  | { progress: number; status: 'downloading' }
  | { status: 'done' }
  | { error: Error; status: 'error' }

export interface BatchDownloadItem {
  meta?: SCTrackSummary
  url: string
}

const BATCH_SIZE = 50

export const useDownloads = createGlobalState(() => {
  const downloads = shallowReactive(new Map<string, DownloadEntry>())
  const isBatchRunning = ref(false)

  const downloadSingle = async (
    url: string,
    { save = false, ...opts }: Omit<DownloadTrackOptions, 'onProgress'> & { save?: boolean } = {},
  ) => {
    if (downloads.get(url)?.status === 'downloading') return

    downloads.set(url, { progress: 0, status: 'downloading' })

    try {
      const res = await downloadTrack(url, {
        ...opts,
        onProgress: (progress, total) =>
          downloads.set(url, { progress: progress / total, status: 'downloading' }),
      })
      downloads.set(url, { status: 'done' })

      if (save) saveAs(res.blob, res.mime, getTrackFilename(res.trackMeta, res.extension))

      return res
    } catch (error) {
      downloads.set(url, { error: error as Error, status: 'error' })
    }
  }

  const downloadBatch = async (items: Iterable<BatchDownloadItem>) => {
    const list = [...items]

    isBatchRunning.value = true
    try {
      const streamUrls = new Map<string, string>()
      for (const c of chunk(
        list.map(i => i.url),
        BATCH_SIZE,
      )) {
        for (const res of await getTrackStreamUrls(c))
          if (res.streamUrl) streamUrls.set(res.url, res.streamUrl)
      }

      const run = limitAsync(downloadSingle, 3)
      const mixedEntries = await Promise.all(
        list.map(async ({ meta, url }) => {
          const res = await run(url, { meta, streamUrl: streamUrls.get(url) })
          if (!res) return

          return {
            input: res.blob,
            name: getTrackFilename(res.trackMeta, res.extension),
          } satisfies InputWithSizeMeta
        }),
      )
      const entries = mixedEntries.filter(isDefined) as InputWithSizeMeta[]

      if (entries.length) await saveViaMemory(entries)
    } finally {
      isBatchRunning.value = false
      for (const { url } of list) if (downloads.get(url)?.status !== 'error') downloads.delete(url)
    }
  }

  const setDownloadState = (url: string, entry: DownloadEntry) => downloads.set(url, entry)

  return {
    downloadBatch,
    downloadSingle,
    downloads,
    isBatchRunning,
    setDownloadState,
  }
})

async function saveViaMemory(entries: InputWithSizeMeta[]) {
  const response = downloadZip(entries)
  const blob = await response.blob()
  saveAs(blob, 'application/zip', getZipFileName())
}
