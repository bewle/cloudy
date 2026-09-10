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
}

export async function downloadTrack(
  url: string,
  { meta, onProgress, streamUrl }: DownloadTrackOptions = {},
): Promise<DownloadTrackResult> {
  const trackMeta = meta ?? (await getTrackMeta(url))

  const trackBuffer = await getTrackBuffer(url, { onProgress, streamUrl })
  const blob = await getTaggedTrackBuffer(trackBuffer, trackMeta, [
    'APIC',
    'COMM',
    'TDAT',
    'TIT2',
    'TPE1',
    'WOAS',
  ])
  const mime = transcodingToMime('mp3')
  const extension = transcodingToExt('mp3')

  return { blob, mime, extension, trackMeta }
}

export interface BatchStreamUrlResult {
  error?: { message: string }
  streamUrl?: string
  url: string
}

export async function getTrackStreamUrls(urls: string[]) {
  return $fetch<BatchStreamUrlResult[]>('/api/track/stream', {
    body: { url: urls },
    method: 'POST',
  })
}

export async function getTrackStreamSegments(url: string, streamUrl?: string) {
  const m3u8Url =
    streamUrl ??
    (await $fetch<string>('/api/track/stream', {
      query: {
        url,
      },
    }))

  const m3u8 = await $fetch<string>(m3u8Url, { responseType: 'text' })

  return [...(m3u8.match(RE__GENERAL_HTTPS_URL) ?? [])]
}

export async function processTrackStreamSegments(
  streamSegments: string[],
  onSegment?: (i: number, total: number) => void,
) {
  let progress = 0
  const process = limitAsync(async (segUrl: string, i: number) => {
    const response = await fetch(segUrl)
    const buffer = await response.arrayBuffer()

    onSegment?.(progress++, streamSegments.length)

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
