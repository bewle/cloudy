export async function getTrackStreamUrl(
  url: string,
  format: SCTranscodingType,
  fallback?: SCTranscodingType,
  avoidLq = false,
) {
  const { media } = await $scResolve(url, 'track')
  const { transcodings } = media ?? {}
  if (!transcodings) throw soundcloudErrors.NO_TRACK_TRANSCODINGS({ why: 'No transcodings found' })

  let resolvedFormat = format
  let bestTranscoding = getBestTranscoding(transcodings, format)
  const alt =
    fallback && fallback !== format ? getBestTranscoding(transcodings, fallback) : undefined
  if (
    alt &&
    (!bestTranscoding || (avoidLq && bestTranscoding.quality === 'lq' && alt.quality !== 'lq'))
  ) {
    resolvedFormat = fallback!
    bestTranscoding = alt
  }
  if (!bestTranscoding) throw soundcloudErrors.NO_TARGET_TRACK_TRANSCODINGS({ transcoding: format })

  const streamUrlRes = await $scRequest(bestTranscoding.url)
  if (!isPlainObject(streamUrlRes) || !streamUrlRes.url || !isString(streamUrlRes.url))
    throw soundcloudErrors.NO_STREAM_URL()

  return { format: resolvedFormat, streamUrl: streamUrlRes.url }
}

function getBestTranscoding(
  transcodings: SCTrack['media']['transcodings'],
  format: SCTranscodingType,
) {
  return getHlsTranscoding(getTargetTranscodings(transcodings, format)).sort((a, b) => {
    if (a.quality === b.quality) return 0
    if (a.quality === 'hq') return -1
    if (a.quality === 'sq') return -1
    else return 1
  })[0]
}
