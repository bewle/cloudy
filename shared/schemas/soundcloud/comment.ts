import * as v from 'valibot'

import { scSearchOf } from './common'
import { scUserMiniSchema } from './user'

export const scCommentSchema = v.looseObject({
  body: v.string(),
  created_at: v.string(),
  id: v.number(),
  kind: v.literal('comment'),
  self: v.looseObject({ urn: v.string() }),
  timestamp: v.number(),
  track_id: v.number(),
  user: scUserMiniSchema,
  user_id: v.number(),
})

export const scCommentSearchSchema = scSearchOf(scCommentSchema)
