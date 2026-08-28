import * as v from 'valibot'

import { loose, scSearchOf } from './common'
import { scUserSchema } from './user'

export const scCommentSchema = v.looseObject({
  body: v.string(),
  created_at: loose(v.string()),
  id: v.number(),
  kind: loose(v.literal('comment')),
  self: loose(v.looseObject({ urn: loose(v.string()) })),
  timestamp: loose(v.number()),
  track_id: loose(v.number()),
  user: loose(scUserSchema),
  user_id: loose(v.number()),
})

export const scCommentSearchSchema = scSearchOf(scCommentSchema)
