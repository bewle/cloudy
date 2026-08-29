import * as v from 'valibot'

import { scPlaylistSchema } from './playlist'
import { scTrackSchema } from './track'

export const scActivitySchema = v.looseObject({
  created_at: v.string(),
  origin: v.union([scTrackSchema, scPlaylistSchema]),
  tags: v.optional(v.nullable(v.string())),
  type: v.string(),
})

export const scActivityCollectionSchema = v.looseObject({
  collection: v.array(scActivitySchema),
  future_href: v.nullable(v.string()),
  next_href: v.nullable(v.string()),
})

export const scConnectionSchema = v.looseObject({
  created_at: v.string(),
  display_name: v.string(),
  id: v.number(),
  post_favorite: v.boolean(),
  post_publish: v.boolean(),
  service: v.string(),
  type: v.string(),
  uri: v.string(),
})
