import * as v from 'valibot'

export const scOembedSchema = v.looseObject({
  author_name: v.optional(v.string()),
  author_url: v.optional(v.string()),
  description: v.string(),
  height: v.number(),
  html: v.string(),
  provider_name: v.string(),
  provider_url: v.string(),
  thumbnail_url: v.optional(v.string()),
  title: v.string(),
  type: v.string(),
  version: v.union([v.string(), v.number()]),
  width: v.union([v.string(), v.number()]),
})

export const scAppSchema = v.looseObject({
  creator: v.string(),
  external_url: v.string(),
  id: v.number(),
  kind: v.literal('app'),
  name: v.string(),
  permalink_url: v.string(),
  uri: v.string(),
})
