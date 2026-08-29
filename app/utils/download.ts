export async function getTrackStreamSegments(url: string) {
  return $fetch('/api/file/track', {
    query: {
      url,
    },
  })
}

export async function processTrackStreamSegments(
  streamSegments: string[],
  onSegment?: (i: number) => void,
) {
  const chunks = await queuePromises(
    streamSegments,
    async (seg, i) => {
      const response = await fetch(seg)
      const buffer = await response.arrayBuffer()

      onSegment?.(i)

      return {
        data: buffer,
        index: i,
      }
    },
    4,
  )

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
