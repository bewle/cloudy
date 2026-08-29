export function getTargetTranscodings(
  transcodings: SCTrack['media']['transcodings'],
  target: SCTranscodingType = 'mp3',
) {
  const re = SC__TRANSCODING_MIME_TYPE_REGEX_MAP[target]
  return transcodings.filter(t => !t.snipped && re.test(t.format.mime_type))
}

export function getHlsTranscoding(transcodings: SCTrack['media']['transcodings']) {
  return transcodings.filter(t => t.format.protocol === 'hls')
}
