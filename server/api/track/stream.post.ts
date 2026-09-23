const bodySchema = v.object({
  format: v.optional(v.picklist(SC__TRANSCODINGS), 'mp3'),
  url: v.pipe(v.array(v.pipe(v.string(), v.url())), v.maxLength(50)),
})

export default defineEventHandler(async event => {
  const body = await validateBody(event, bodySchema)

  const resolve = limitAsync(async (url: string) => {
    const [err, streamUrl] = await attemptAsync<string, Error>(() =>
      getTrackStreamUrl(url, body.format),
    )
    return err ? { error: { message: err.message }, url } : { streamUrl, url }
  }, 8)

  return Promise.all(body.url.map(resolve))
})
