import * as v from 'valibot'

import { loose } from './common'

export const scOembedSchema = v.looseObject({
  author_name: loose(v.string()),
  author_url: loose(v.string()),
  description: loose(v.string()),
  height: loose(v.number()),
  html: v.string(),
  provider_name: loose(v.string()),
  provider_url: loose(v.string()),
  thumbnail_url: loose(v.string()),
  title: loose(v.string()),
  type: loose(v.string()),
  version: loose(v.string()),
  width: loose(v.union([v.string(), v.number()])),
})

export const scAppSchema = v.looseObject({
  creator: loose(v.string()),
  external_url: loose(v.string()),
  id: v.number(),
  kind: loose(v.literal('app')),
  name: loose(v.string()),
  permalink_url: loose(v.string()),
  uri: loose(v.string()),
})
