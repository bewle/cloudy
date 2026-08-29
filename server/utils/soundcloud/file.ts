export async function getTrackStreamUrl(url: string) {
  const { media } = await $scResolve(url, 'track')
  const { transcodings } = media ?? {}
  if (!transcodings) throw soundcloudErrors.NO_TRACK_TRANSCODINGS({ why: 'No transcodings found' })

  const _transcoding: SCTranscodingType = 'aac'

  const targetTranscodings = getTargetTranscodings(transcodings, _transcoding)
  if (!targetTranscodings)
    throw soundcloudErrors.NO_TARGET_TRACK_TRANSCODINGS({ transcoding: _transcoding })

  const hlsTranscodings = getHlsTranscoding(targetTranscodings)
  if (!hlsTranscodings)
    throw soundcloudErrors.NO_TRACK_TRANSCODINGS({ why: 'No HLS transcodings found' })

  const sortedTranscodings = hlsTranscodings.sort((a, b) => {
    if (a.quality === b.quality) return 0
    if (a.quality === 'hq') return -1
    if (a.quality === 'sq') return -1
    else return 1
  })

  const bestTranscoding = sortedTranscodings[0]
  if (!bestTranscoding)
    throw soundcloudErrors.NO_TRACK_TRANSCODINGS({
      why: 'No transcodings found after filtering/sorting',
    })

  const streamUrlRes = await $scRequest(bestTranscoding.url)
  if (!isPlainObject(streamUrlRes) || !streamUrlRes.url || !isString(streamUrlRes.url))
    throw soundcloudErrors.NO_STREAM_URL()

  return streamUrlRes.url
}

export async function getTrackHlsUrl(url: string) {
  const streamUrl = await getTrackStreamUrl(url)
  return $fetch<string>(streamUrl, {
    responseType: 'text',
  })
}
