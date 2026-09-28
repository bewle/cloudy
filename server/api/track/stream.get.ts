const querySchema = v.object({
  avoidLq: v.optional(
    v.pipe(
      v.picklist(['true', 'false']),
      v.transform(s => s === 'true'),
    ),
  ),
  fallback: v.optional(v.picklist(SC__TRANSCODINGS)),
  format: v.optional(v.picklist(SC__TRANSCODINGS), 'mp3'),
  url: v.pipe(v.string(), v.url()),
})

export default defineEventHandler(async event => {
  const query = validateQuery(event, querySchema)
  return getTrackStreamUrl(query.url, query.format, query.fallback, query.avoidLq)
})
