const bodySchema = v.object({
  fallback: v.optional(v.picklist(SC__TRANSCODINGS)),
  format: v.optional(v.picklist(SC__TRANSCODINGS), 'mp3'),
  url: v.pipe(v.array(v.pipe(v.string(), v.url())), v.maxLength(50)),
})

export default defineEventHandler(async event => {
  const body = await validateBody(event, bodySchema)

  const resolve = limitAsync(async (url: string) => {
    const [err, stream] = await attemptAsync<TrackStream, Error>(() =>
      getTrackStreamUrl(url, body.format, body.fallback),
    )
    return err ? { error: { message: err.message }, url } : { ...stream, url }
  }, 8)

  return Promise.all(body.url.map(resolve))
})
