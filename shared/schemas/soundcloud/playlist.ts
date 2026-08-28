import * as v from 'valibot'

import {
  loose,
  scEmbeddableBySchema,
  scKind,
  scLicenseSchema,
  scSearchOf,
  scSharingSchema,
} from './common'
import { scTrackOrStubSchema } from './track'
import { scUserSchema } from './user'

export const scPlaylistSchema = v.looseObject({
  artwork_url: loose(v.string()),
  created_at: loose(v.string()),
  description: loose(v.string()),
  display_date: loose(v.string()),
  duration: loose(v.number()),
  embeddable_by: loose(scEmbeddableBySchema),
  genre: loose(v.string()),
  id: v.number(),
  is_album: loose(v.boolean()),
  kind: scKind('playlist'),
  label_name: loose(v.string()),
  last_modified: loose(v.string()),
  license: loose(scLicenseSchema),
  likes_count: loose(v.number()),
  managed_by_feeds: loose(v.boolean()),
  permalink: loose(v.string()),
  permalink_url: loose(v.string()),
  public: loose(v.boolean()),
  published_at: loose(v.string()),
  purchase_title: loose(v.string()),
  purchase_url: loose(v.string()),
  release_date: loose(v.string()),
  reposts_count: loose(v.number()),
  secret_token: loose(v.string()),
  set_type: loose(v.string()),
  sharing: loose(scSharingSchema),
  tag_list: loose(v.string()),
  title: v.string(),
  track_count: loose(v.number()),
  tracks: loose(v.array(scTrackOrStubSchema)),
  uri: loose(v.string()),
  urn: loose(v.string()),
  user: loose(scUserSchema),
  user_id: loose(v.number()),
})

export const scPlaylistSearchSchema = scSearchOf(scPlaylistSchema)
