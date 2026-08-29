import {
  BufferTarget,
  Conversion,
  HLS_FORMATS,
  Input,
  Mp4OutputFormat,
  Output,
  UrlSource,
} from 'mediabunny'

export async function getTrackMeta(url: string) {
  return $fetch<SCTrackSummary>('/api/meta/track', {
    query: { url },
  })
}

export async function getTrackBuffer(url: string, onProgress?: Conversion['onProgress']) {
  const trackMeta = await getTrackMeta(url)
  const hlsUrl = await $fetch('/api/file/track', { query: { url } })

  const input = new Input({
    source: new UrlSource(hlsUrl),
    formats: HLS_FORMATS,
  })

  const target = new BufferTarget()
  const output = new Output({
    format: new Mp4OutputFormat(),
    target,
  })

  const conversion = await Conversion.init({
    input,
    output,
    video: { discard: true },
    tags: async () => getTrackTags(trackMeta),
  })

  conversion.onProgress = onProgress

  await conversion.execute()

  const buffer = target.buffer!
  const mime = await output.getMimeType()

  const extension = normalizeTrackExtension(output.format.fileExtension)

  return { buffer, mime, extension }
}
