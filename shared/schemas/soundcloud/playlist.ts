import * as v from 'valibot'

import { scEmbeddableBySchema, scLicenseSchema, scSearchOf, scSharingSchema } from './common'
import { scTrackOrStubSchema } from './track'
import { scUserMiniSchema } from './user'

export const scPlaylistSchema = v.looseObject({
  artwork_url: v.nullable(v.string()),
  created_at: v.string(),
  description: v.nullable(v.string()),
  display_date: v.string(),
  duration: v.number(),
  embeddable_by: scEmbeddableBySchema,
  genre: v.nullable(v.string()),
  id: v.number(),
  is_album: v.boolean(),
  kind: v.literal('playlist'),
  label_name: v.nullable(v.string()),
  last_modified: v.string(),
  license: scLicenseSchema,
  likes_count: v.number(),
  managed_by_feeds: v.boolean(),
  permalink: v.string(),
  permalink_url: v.string(),
  public: v.boolean(),
  published_at: v.nullable(v.string()),
  purchase_title: v.nullable(v.string()),
  purchase_url: v.nullable(v.string()),
  release_date: v.nullable(v.string()),
  reposts_count: v.number(),
  secret_token: v.nullable(v.string()),
  set_type: v.string(),
  sharing: scSharingSchema,
  tag_list: v.string(),
  title: v.string(),
  track_count: v.number(),
  tracks: v.array(scTrackOrStubSchema),
  uri: v.string(),
  urn: v.optional(v.string()),
  user: scUserMiniSchema,
  user_id: v.number(),
})

export const scPlaylistSearchSchema = scSearchOf(scPlaylistSchema)
