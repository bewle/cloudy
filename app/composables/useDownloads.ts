import { downloadZip, type InputWithSizeMeta } from 'client-zip'
import { Semaphore } from 'es-toolkit'

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
  status: 'idle' | 'downloading' | 'done' | 'aborted' | 'error'
  collapsed: boolean
  abortController?: AbortController
}

export type FlatBatch =
  | { type: 'heading'; id: string }
  | { type: 'entry'; url: string; last: boolean; key: string; entry: DownloadEntry }
  | { type: 'separator'; id: number }

const BATCH_SIZE = 50
const MAX_CONCURRENCY = 3

export const useDownloads = createGlobalState(() => {
  const downloads = shallowReactive(new Map<string, DownloadEntry>())
  const batches = shallowReactive(new Map<DownloadBatch['id'], DownloadBatch>())
  const settings = useSettings()
  const { $analytics } = useNuxtApp()
  const isBatchRunning = ref(false)
  const queue = new Semaphore(MAX_CONCURRENCY)

  const getFallbackFormat = () =>
    settings.value.fallbackFormat.enabled ? settings.value.fallbackFormat.format : undefined

  const downloadSingle = async (
    url: string,
    {
      save = false,
      key = url,
      ...opts
    }: Omit<DownloadTrackOptions, 'onProgress'> & { save?: boolean; key?: string } = {},
  ) => {
    if (downloads.get(key)?.status === 'downloading') return

    const format = opts.format ?? settings.value.preferredFormat
    const fallback = opts.fallback ?? getFallbackFormat()
    const avoidLq = opts.avoidLq ?? settings.value.fallbackFormat.avoidLq

    downloads.set(key, { status: 'queued' })
    await queue.acquire()

    try {
      opts.signal?.throwIfAborted()
      downloads.set(key, { progress: 0, status: 'downloading' })
      const res = await downloadTrack(url, {
        ...opts,
        avoidLq,
        fallback,
        format,
        frames: settings.value.metadataFrames,
        onProgress: (progress, total) =>
          downloads.set(key, { progress: progress / total, status: 'downloading' }),
      })
      downloads.set(key, { status: 'done' })

      if (save) {
        $analytics.track('TRACK_SINGLE', { duration: res.trackMeta.duration })
        saveAs(res.blob, res.mime, getTrackFilename(res.trackMeta, res.extension))
      }

      return res
    } catch (error) {
      downloads.set(
        key,
        opts.signal?.aborted ? { status: 'aborted' } : { error: error as Error, status: 'error' },
      )
    } finally {
      queue.release()
    }
  }

  const downloadBatch = async (
    items: Iterable<BatchDownloadItem>,
    batchName: string,
    source: DownloadBatch['source'],
  ) => {
    const format = settings.value.preferredFormat
    const fallback = getFallbackFormat()
    const { avoidLq } = settings.value.fallbackFormat
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

    const setBatchStatus = (status: DownloadBatch['status']) => {
      const current = batches.get(batchId)
      if (current) batches.set(batchId, { ...current, status })
    }

    isBatchRunning.value = true
    try {
      const streams = new Map<string, TrackStream>()
      for (const c of chunk(
        list.map(i => i.url),
        BATCH_SIZE,
      )) {
        for (const res of await getTrackStreamUrls(c, { avoidLq, fallback, format, signal }))
          if (res.streamUrl && res.format)
            streams.set(res.url, { format: res.format, streamUrl: res.streamUrl })
      }

      const mixedEntries = await Promise.all(
        list.map(async ({ meta, url }) => {
          const res = await downloadSingle(url, {
            avoidLq,
            fallback,
            format,
            key: getBatchTrackKey(batchId, url),
            meta,
            signal,
            ...streams.get(url),
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

      if (entries.length) {
        await saveViaMemory(entries)
        $analytics.track('TRACK_BATCH', {
          duration: list.reduce(
            (total, { meta }, i) => total + (mixedEntries[i] ? (meta?.duration ?? 0) : 0),
            0,
          ),
          trackCount: entries.length,
        })
      }

      const hasError = list.some(
        ({ url }) => downloads.get(getBatchTrackKey(batchId, url))?.status === 'error',
      )
      setBatchStatus(hasError ? 'error' : 'done')
    } catch {
      if (!signal.aborted) return setBatchStatus('error')

      for (const { url } of list) {
        const key = getBatchTrackKey(batchId, url)
        const status = downloads.get(key)?.status
        if (status === 'queued' || status === 'downloading')
          downloads.set(key, { status: 'aborted' })
      }
      setBatchStatus('aborted')
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
