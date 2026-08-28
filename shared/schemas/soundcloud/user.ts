import * as v from 'valibot'

import { loose, scKind, scSearchOf } from './common'

export const scVisualSchema = v.looseObject({
  entry_time: loose(v.number()),
  urn: loose(v.string()),
  visual_url: loose(v.string()),
})

export const scCreatorSubscriptionSchema = v.looseObject({
  product: loose(v.looseObject({ id: loose(v.string()) })),
})

export const scUserMiniSchema = v.looseObject({
  avatar_url: loose(v.string()),
  id: v.number(),
  kind: loose(v.literal('user')),
  last_modified: loose(v.string()),
  permalink: loose(v.string()),
  permalink_url: loose(v.string()),
  uri: loose(v.string()),
  username: v.string(),
})

export const scUserSchema = v.looseObject({
  avatar_url: loose(v.string()),
  city: loose(v.string()),
  comments_count: loose(v.number()),
  country_code: loose(v.number()),
  created_at: loose(v.string()),
  creator_subscription: loose(scCreatorSubscriptionSchema),
  creator_subscriptions: loose(v.array(scCreatorSubscriptionSchema)),
  description: loose(v.string()),
  first_name: loose(v.string()),
  followers_count: loose(v.number()),
  followings_count: loose(v.number()),
  full_name: loose(v.string()),
  groups_count: loose(v.number()),
  id: v.number(),
  kind: scKind('user'),
  last_modified: loose(v.string()),
  last_name: loose(v.string()),
  likes_count: loose(v.number()),
  permalink: loose(v.string()),
  permalink_url: loose(v.string()),
  playlist_count: loose(v.number()),
  playlist_likes_count: loose(v.number()),
  reposts_count: loose(v.number()),
  track_count: loose(v.number()),
  uri: loose(v.string()),
  urn: loose(v.string()),
  username: v.string(),
  verified: loose(v.boolean()),
  visuals: loose(
    v.looseObject({
      enabled: loose(v.boolean()),
      tracking: loose(v.unknown()),
      urn: loose(v.string()),
      visuals: loose(v.array(scVisualSchema)),
    }),
  ),
})

export const scWebProfileSchema = v.looseObject({
  network: loose(v.string()),
  title: loose(v.string()),
  url: loose(v.string()),
  username: loose(v.string()),
})

export const scUserSearchSchema = scSearchOf(scUserSchema)
