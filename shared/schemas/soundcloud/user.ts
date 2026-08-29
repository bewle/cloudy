import * as v from 'valibot'

import { scSearchOf } from './common'

export const scVisualSchema = v.looseObject({
  entry_time: v.number(),
  urn: v.string(),
  visual_url: v.string(),
})

export const scCreatorSubscriptionSchema = v.looseObject({
  product: v.looseObject({ id: v.string() }),
})

export const scUserMiniSchema = v.looseObject({
  avatar_url: v.nullable(v.string()),
  city: v.optional(v.nullable(v.string())),
  country_code: v.optional(v.nullable(v.string())),
  first_name: v.optional(v.string()),
  followers_count: v.optional(v.number()),
  full_name: v.optional(v.string()),
  id: v.number(),
  kind: v.literal('user'),
  last_modified: v.string(),
  last_name: v.optional(v.string()),
  permalink: v.string(),
  permalink_url: v.string(),
  reposts_count: v.optional(v.nullable(v.number())),
  uri: v.string(),
  urn: v.optional(v.string()),
  username: v.string(),
  verified: v.optional(v.boolean()),
})

export const scUserSchema = v.looseObject({
  avatar_url: v.nullable(v.string()),
  city: v.nullable(v.string()),
  comments_count: v.number(),
  country_code: v.nullable(v.string()),
  created_at: v.string(),
  creator_subscription: v.nullable(scCreatorSubscriptionSchema),
  creator_subscriptions: v.array(scCreatorSubscriptionSchema),
  description: v.nullable(v.string()),
  first_name: v.string(),
  followers_count: v.number(),
  followings_count: v.number(),
  full_name: v.string(),
  groups_count: v.number(),
  id: v.number(),
  kind: v.literal('user'),
  last_modified: v.string(),
  last_name: v.string(),
  likes_count: v.number(),
  permalink: v.string(),
  permalink_url: v.string(),
  playlist_count: v.number(),
  playlist_likes_count: v.number(),
  reposts_count: v.nullable(v.number()),
  track_count: v.number(),
  uri: v.string(),
  urn: v.string(),
  username: v.string(),
  verified: v.boolean(),
  visuals: v.nullable(
    v.looseObject({
      enabled: v.boolean(),
      tracking: v.null(),
      urn: v.string(),
      visuals: v.array(scVisualSchema),
    }),
  ),
})

export const scWebProfileSchema = v.looseObject({
  network: v.optional(v.string()),
  service: v.optional(v.string()),
  title: v.string(),
  url: v.string(),
  username: v.nullable(v.string()),
})

export const scUserSearchSchema = scSearchOf(scUserSchema)
export const scUserCollectionSchema = scUserSearchSchema
