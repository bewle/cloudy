import { ID3Writer } from 'browser-id3-writer'

export async function getTrackMeta(url: string) {
  return $fetch<SCTrackSummary>('/api/meta/track', {
    query: { url },
  })
}

export async function getTrackBuffer(url: string, onProgress?: (i: number, total: number) => void) {
  const segs = await getTrackStreamSegments(url)
  return processTrackStreamSegments(segs, onProgress)
}

export async function getTaggedTrackBuffer(
  trackBuffer: ArrayBuffer,
  trackMeta: SCTrackSummary,
  frameIds: ID3FrameIdWritable[],
) {
  const writer = new ID3Writer(trackBuffer)

  const frames = await mapAsync(frameIds, async id => {
    let payload: any

    switch (id) {
      case 'TPE1': {
        payload = [resolveTrackArtist(trackMeta)]
        break
      }
      case 'TIT2': {
        payload = trackMeta.title
        break
      }
      case 'TDAT': {
        payload = trackMeta.created_at
        break
      }
      case 'COMM': {
        if (trackMeta.description) {
          payload = {
            description: '',
            language: 'eng',
            text: trackMeta.description,
          }
        }
        break
      }
      case 'WOAS': {
        payload = trackMeta.permalink_url
        break
      }
      case 'APIC': {
        payload = {
          data: await getTrackCoverBuffer(trackMeta),
          description: 'Attached cover',
          type: 3,
        }
        break
      }
    }

    return {
      id,
      payload,
    }
  })

  frames.forEach(({ id, payload }) => {
    if (payload) writer.setFrame(id as any, payload)
  })
  writer.addTag()

  return writer.getBlob()
}
