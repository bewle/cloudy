export interface DownloadTrackResult {
  blob: Blob
  mime: string
  extension: string
  trackMeta: SCTrackSummary
}

export interface DownloadTrackOptions {
  meta?: SCTrackSummary
  onProgress?: (i: number, total: number) => void
  streamUrl?: string
  signal?: AbortSignal
  format?: SCTranscodingType
}

export async function downloadTrack(
  url: string,
  { meta, onProgress, signal, streamUrl, format = 'mp3' }: DownloadTrackOptions = {},
): Promise<DownloadTrackResult> {
  const trackMeta = meta ?? (await getTrackMeta(url, signal))

  const trackBuffer = await getTrackBuffer(url, { format, onProgress, signal, streamUrl })
  const tags = await getTrackTags(trackMeta, ['APIC', 'COMM', 'TDAT', 'TIT2', 'TPE1', 'WOAS'])
  const blob = await getTaggedTrackBlob({ buffer: trackBuffer, format, signal, tags })
  const mime = transcodingToMime(format)
  const extension = transcodingToExt(format)

  return { blob, extension, mime, trackMeta }
}

export interface BatchStreamUrlResult {
  error?: { message: string }
  streamUrl?: string
  url: string
}

export async function getTrackStreamUrls(
  urls: string[],
  { signal, format }: Pick<DownloadTrackOptions, 'signal' | 'format'> = {},
) {
  return $fetch<BatchStreamUrlResult[]>('/api/track/stream', {
    body: { format, url: urls },
    method: 'POST',
    signal,
  })
}

export async function getTrackStreamSegments(
  url: string,
  {
    signal,
    streamUrl,
    format = SETTINGS__DEFAULT.preferredFormat,
  }: Pick<DownloadTrackOptions, 'signal' | 'streamUrl' | 'format'> = {},
) {
  const m3u8Url =
    streamUrl ??
    (await $fetch<string>('/api/track/stream', {
      query: {
        format,
        url,
      },
      signal,
    }))

  const m3u8 = await $fetch<string>(m3u8Url, { responseType: 'text', signal })

  return [...(m3u8.match(RE__GENERAL_HTTPS_URL) ?? [])]
}

export interface ProcessTrackStreamSegmentsOptions {
  onProgress?: (i: number, total: number) => void
  signal?: AbortSignal
}

export async function processTrackStreamSegments(
  streamSegments: string[],
  { onProgress, signal }: ProcessTrackStreamSegmentsOptions = {},
) {
  let progress = 0
  const process = limitAsync(async (segUrl: string, i: number) => {
    const response = await fetch(segUrl, { signal })
    const buffer = await response.arrayBuffer()

    onProgress?.(progress++, streamSegments.length)

    return {
      data: buffer,
      index: i,
    }
  }, 4)

  const chunks = await Promise.all(streamSegments.map((seg, i) => process(seg, i)))
  return concatArrayBuffers(chunks.map(c => c.data))
}

export function saveAs(
  input: Blob | BlobPart | BlobPart[],
  mimeType: string,
  filename: string,
): void {
  const name = filename.trim()

  const blob =
    input instanceof Blob
      ? input
      : new Blob(Array.isArray(input) ? input : [input], {
          type: mimeType,
        })

  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  const parent = document.body ?? document.documentElement

  if (!parent) {
    URL.revokeObjectURL(url)
    throw new Error('Cannot access the document root.')
  }

  anchor.href = url
  anchor.download = name
  anchor.hidden = true

  const cleanup = (): void => {
    URL.revokeObjectURL(url)
    anchor.remove()
  }

  try {
    parent.append(anchor)
    anchor.click()
  } finally {
    window.setTimeout(cleanup, 1000)
  }
}
