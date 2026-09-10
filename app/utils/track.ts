import { ID3Writer } from 'browser-id3-writer'

export type TrackRow =
  | { status: 'pending'; url: string }
  | { status: 'ready'; track: SCTrackSummary; url: string }
  | { error: Error; status: 'error'; url: string }

export interface TrackSource {
  canLoadMore: Ref<boolean>
  isLoading: Ref<boolean>
  items: Ref<TrackRow[]>
  loadNextHref: () => void
  retry?: (url: string) => void
}

export const toReadyTrackRow = (track: SCTrackSummary): TrackRow => ({
  status: 'ready',
  track,
  url: track.permalink_url,
})

export async function getTrackMeta(url: string) {
  return $fetch<SCTrackSummary>('/api/track/meta', {
    query: { url },
  })
}

export async function getTrackBuffer(
  url: string,
  { onProgress, streamUrl }: Pick<DownloadTrackOptions, 'onProgress' | 'streamUrl'> = {},
) {
  const segs = await getTrackStreamSegments(url, streamUrl)
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
        const data = await getTrackCoverBuffer(trackMeta)
        if (data)
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
