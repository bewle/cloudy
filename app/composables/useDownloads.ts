import { downloadZip, type InputWithSizeMeta } from 'client-zip'

export type DownloadEntry =
  | { status: 'queued' }
  | { progress: number; status: 'downloading' }
  | { status: 'done' }
  | { status: 'aborted' }
  | { error: Error; status: 'error' }

export interface BatchDownloadItem {
  meta?: SCTrackSummary
  url: string
}

export interface DownloadBatch {
  id: string
  name: string
  source: SidebarTrackSourceKey
  tracks: string[]
  status: 'idle' | 'downloading' | 'done' | 'aborted'
  collapsed: boolean
  abortController?: AbortController
}

const BATCH_SIZE = 50

export const useDownloads = createGlobalState(() => {
  const downloads = shallowReactive(new Map<string, DownloadEntry>())
  const batches = shallowReactive(new Map<DownloadBatch['id'], DownloadBatch>())
  const isBatchRunning = ref(false)

  const downloadSingle = async (
    url: string,
    {
      save = false,
      key = url,
      ...opts
    }: Omit<DownloadTrackOptions, 'onProgress'> & { save?: boolean; key?: string } = {},
  ) => {
    if (downloads.get(key)?.status === 'downloading') return

    downloads.set(key, { progress: 0, status: 'downloading' })

    try {
      opts.signal?.throwIfAborted()
      const res = await downloadTrack(url, {
        ...opts,
        onProgress: (progress, total) =>
          downloads.set(key, { progress: progress / total, status: 'downloading' }),
      })
      downloads.set(key, { status: 'done' })

      if (save) saveAs(res.blob, res.mime, getTrackFilename(res.trackMeta, res.extension))

      return res
    } catch (error) {
      downloads.set(
        key,
        opts.signal?.aborted ? { status: 'aborted' } : { error: error as Error, status: 'error' },
      )
    }
  }

  const downloadBatch = async (
    items: Iterable<BatchDownloadItem>,
    batchName: string,
    source: DownloadBatch['source'],
  ) => {
    const list = [...items]

    const abortController = new AbortController()
    const { signal } = abortController

    const batchId = crypto.randomUUID()
    const batch: DownloadBatch = {
      abortController,
      // TODO: make default setting
      collapsed: false,
      id: batchId,
      name: batchName,
      source,
      status: 'downloading',
      tracks: list.map(({ url }) => url),
    }
    batches.set(batchId, batch)

    for (const { url } of list) {
      downloads.set(getBatchTrackKey(batchId, url), { status: 'queued' })
    }

    isBatchRunning.value = true
    try {
      const streamUrls = new Map<string, string>()
      for (const c of chunk(
        list.map(i => i.url),
        BATCH_SIZE,
      )) {
        for (const res of await getTrackStreamUrls(c, signal))
          if (res.streamUrl) streamUrls.set(res.url, res.streamUrl)
      }

      const run = limitAsync(downloadSingle, 3)
      const mixedEntries = await Promise.all(
        list.map(async ({ meta, url }) => {
          const res = await run(url, {
            key: getBatchTrackKey(batchId, url),
            meta,
            signal,
            streamUrl: streamUrls.get(url),
          })
          if (!res) return

          return {
            input: res.blob,
            name: getTrackFilename(res.trackMeta, res.extension),
          } satisfies InputWithSizeMeta
        }),
      )
      signal.throwIfAborted()
      const entries = mixedEntries.filter(isDefined) as InputWithSizeMeta[]

      if (entries.length) await saveViaMemory(entries)

      batches.set(batchId, { ...batches.get(batchId)!, status: 'done' })
    } catch (err) {
      if (!signal.aborted) throw err
      batches.set(batchId, { ...batches.get(batchId)!, status: 'aborted' })
    } finally {
      isBatchRunning.value = false
    }
  }

  const abortBatch = (batchId: DownloadBatch['id']) =>
    batches.get(batchId)?.abortController?.abort()
  const deleteBatch = (batchId: DownloadBatch['id']) => {
    const batch = batches.get(batchId)
    if (!batch) return

    if (batch.status === 'downloading') abortBatch(batchId)
    batches.delete(batchId)
  }

  const setDownloadState = (url: string, entry: DownloadEntry) => downloads.set(url, entry)
  const toggleCollapseBatch = (batchId: string) => {
    const batch = batches.get(batchId)
    if (!batch) return

    batches.set(batchId, { ...batch, collapsed: !batch.collapsed })
  }

  return {
    abortBatch,
    batches,
    deleteBatch,
    downloadBatch,
    downloadSingle,
    downloads,
    isBatchRunning,
    setDownloadState,
    toggleCollapseBatch,
  }
})

async function saveViaMemory(entries: InputWithSizeMeta[]) {
  const response = downloadZip(entries)
  const blob = await response.blob()
  saveAs(blob, 'application/zip', getZipFileName())
}

export function getBatchTrackKey(batchId: DownloadBatch['id'], itemUrl: BatchDownloadItem['url']) {
  return `${batchId}:${itemUrl}`
}
