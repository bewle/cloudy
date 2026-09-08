export async function getTrackStreamSegments(url: string) {
  const m3u8Url = await $fetch('/api/track/stream', {
    query: {
      url,
    },
  })

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
