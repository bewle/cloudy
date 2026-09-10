const bodySchema = v.object({
  url: v.pipe(v.array(v.pipe(v.string(), v.url())), v.maxLength(50)),
})

export default defineEventHandler(async event => {
  const body = await validateBody(event, bodySchema)

  const resolve = limitAsync(async (url: string) => {
    const [err, meta] = await attemptAsync<SCTrack, Error>(() => getTrackMeta(url))
    return err
      ? { error: { message: err.message }, url }
      : { track: pick(meta, SC__TRACK_SUMMARY_KEYS), url }
  }, 8)

  return Promise.all(body.url.map(resolve))
})
