export type TrackRow =
  | { status: 'pending'; url: string }
  | { status: 'ready'; track: SCTrackSummary; url: string }
  | { error: Error; status: 'error'; url: string }

export interface TrackSource {
  error: Ref<Error | undefined>
  canLoadMore: Ref<boolean>
  isLoading: Ref<boolean>
  items: Ref<TrackRow[]>
  loadNextHref: () => void
}

export const toReadyTrackRow = (track: SCTrackSummary): TrackRow => ({
  status: 'ready',
  track,
  url: track.permalink_url,
})

export async function getTrackMeta(url: string, signal?: AbortSignal) {
  return $fetch<SCTrackSummary>('/api/track/meta', {
    query: { url },
    signal,
  })
}

export async function getTrackBuffer(
  url: string,
  {
    onProgress,
    signal,
    streamUrl,
    format,
  }: Pick<DownloadTrackOptions, 'onProgress' | 'signal' | 'streamUrl' | 'format'> = {},
) {
  const segs = await getTrackStreamSegments(url, { format, signal, streamUrl })
  return processTrackStreamSegments(segs, { onProgress, signal })
}
