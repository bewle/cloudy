import type { MetadataTags } from 'mediabunny'

export type TagWorkerPayload =
  | { action: 'tag'; id: string; buffer: ArrayBuffer; tags: MetadataTags }
  | { action: 'cancel'; id: string }

export type TagWorkerResponse =
  | { action: 'tag'; id: string; buffer: ArrayBuffer }
  | { action: 'tag'; id: string; error: string }

let tagWorker: Worker | undefined
export const getTagWorker = () =>
  (tagWorker ??= new Worker(new URL('../workers/tag.worker.ts', import.meta.url), {
    type: 'module',
  }))

export const getTaggedTrackBlob = ({
  buffer,
  format,
  tags,
  signal,
}: {
  buffer: ArrayBuffer
  format: SCTranscodingType
  tags: MetadataTags
  signal?: AbortSignal
}) => {
  signal?.throwIfAborted()

  const worker = getTagWorker()
  const id = crypto.randomUUID()
  const payload: TagWorkerPayload = { action: 'tag', buffer, id, tags }
  worker.postMessage(payload, [buffer])

  return new Promise<Blob>((resolve, reject) => {
    const cleanup = () => {
      worker.removeEventListener('message', handleMsg)
      worker.removeEventListener('error', handleError)
      worker.removeEventListener('messageerror', handleError)
      signal?.removeEventListener('abort', handleAbort)
    }

    function handleMsg(e: MessageEvent<TagWorkerResponse>) {
      if (!('id' in e.data) || !('action' in e.data) || e.data.id !== id) return

      cleanup()

      if ('error' in e.data) reject(new Error(e.data.error))
      else resolve(new Blob([e.data.buffer], { type: transcodingToMime(format) }))
    }

    function handleError(e: Event) {
      cleanup()
      if (e.type === 'error' && tagWorker === worker) {
        worker.terminate()
        tagWorker = undefined
      }
      reject(new Error(e instanceof ErrorEvent ? e.message : 'Tag worker failed'))
    }

    function handleAbort() {
      cleanup()
      worker.postMessage({ action: 'cancel', id } satisfies TagWorkerPayload)
      reject(signal!.reason)
    }

    worker.addEventListener('message', handleMsg)
    worker.addEventListener('error', handleError)
    worker.addEventListener('messageerror', handleError)
    signal?.addEventListener('abort', handleAbort)
  })
}

export async function getTrackTags(trackMeta: SCTrackSummary, frameIds: ID3FrameIdWritable[]) {
  const frames = await mapAsync(frameIds, async id => {
    let mediaBunnyKey: keyof MetadataTags | undefined
    let payload: any

    switch (id) {
      case 'TPE1': {
        mediaBunnyKey = 'artist'
        payload = resolveTrackArtist(trackMeta)
        break
      }
      case 'TIT2': {
        mediaBunnyKey = 'title'
        payload = trackMeta.title
        break
      }
      case 'TDAT': {
        mediaBunnyKey = 'date'
        payload = new Date(trackMeta.created_at)
        break
      }
      case 'COMM': {
        if (trackMeta.description) {
          mediaBunnyKey = 'comment'
          payload = trackMeta.description
        }
        break
      }
      case 'WOAS': {
        mediaBunnyKey = 'raw'
        payload = { WOAS: new TextEncoder().encode(trackMeta.permalink_url) }
        break
      }
      case 'APIC': {
        const data = await getTrackCoverBuffer(trackMeta)
        if (data) {
          mediaBunnyKey = 'images'
          payload = [
            {
              data: new Uint8Array(data),
              kind: 'coverFront',
              mimeType: 'image/jpeg',
            },
          ]
        }

        break
      }
    }

    return [mediaBunnyKey, payload]
  })

  return Object.fromEntries(frames.filter(f => f[1] !== undefined)) as MetadataTags
}
