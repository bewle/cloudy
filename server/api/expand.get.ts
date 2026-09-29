const querySchema = v.object({
  url: v.pipe(v.string(), v.url()),
})

export default defineEventHandler(async (event): Promise<string> => {
  const query = validateQuery(event, querySchema)
  if (!isShortUrl(query.url)) throw validationErrors.INVALID_URL({ option: 'track' })

  const [err, res] = await attemptAsync(() => fetch(query.url, { redirect: 'manual' }))
  const location = URL.parse(res?.headers.get('location') ?? '')
  if (err || location?.origin !== SC__SITE_URL) throw soundcloudErrors.NOT_FOUND()

  return location.origin + location.pathname
})
