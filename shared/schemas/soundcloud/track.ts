import * as v from 'valibot'

import {
  loose,
  scEmbeddableBySchema,
  scKind,
  scLicenseSchema,
  scSearchOf,
  scSharingSchema,
} from './common'
import { scUserSchema } from './user'

export const scTranscodingSchema = v.looseObject({
  duration: loose(v.number()),
  format: loose(
    v.looseObject({
      mime_type: loose(v.string()),
      protocol: loose(v.string()),
    }),
  ),
  preset: loose(v.string()),
  quality: loose(v.string()),
  snipped: loose(v.boolean()),
  url: v.string(),
})

export const scPublisherMetadataSchema = v.looseObject({
  album_title: loose(v.string()),
  artist: loose(v.string()),
  c_line: loose(v.string()),
  c_line_for_display: loose(v.string()),
  contains_music: loose(v.boolean()),
  explicit: loose(v.boolean()),
  id: loose(v.number()),
  isrc: loose(v.string()),
  p_line: loose(v.string()),
  p_line_for_display: loose(v.string()),
  publisher: loose(v.string()),
  release_title: loose(v.string()),
  upc_or_ean: loose(v.string()),
  urn: loose(v.string()),
  writer_composer: loose(v.string()),
})

export const scTrackSchema = v.looseObject({
  artwork_url: loose(v.string()),
  caption: loose(v.string()),
  comment_count: loose(v.number()),
  commentable: loose(v.boolean()),
  created_at: loose(v.string()),
  description: loose(v.string()),
  display_date: loose(v.string()),
  download_count: loose(v.number()),
  downloadable: loose(v.boolean()),
  duration: loose(v.number()),
  embeddable_by: loose(scEmbeddableBySchema),
  full_duration: loose(v.number()),
  genre: loose(v.string()),
  has_downloads_left: loose(v.boolean()),
  id: v.number(),
  kind: scKind('track'),
  label_name: loose(v.string()),
  last_modified: loose(v.string()),
  license: loose(scLicenseSchema),
  likes_count: loose(v.number()),
  media: loose(
    v.looseObject({
      transcodings: loose(v.array(scTranscodingSchema)),
    }),
  ),
  monetization_model: loose(v.string()),
  permalink: loose(v.string()),
  permalink_url: loose(v.string()),
  playable: loose(v.boolean()),
  playback_count: loose(v.number()),
  policy: loose(v.string()),
  public: loose(v.boolean()),
  publisher_metadata: loose(scPublisherMetadataSchema),
  purchase_title: loose(v.string()),
  purchase_url: loose(v.string()),
  release_date: loose(v.string()),
  reposts_count: loose(v.number()),
  secret_token: loose(v.string()),
  sharing: loose(scSharingSchema),
  state: loose(v.picklist(['processing', 'failed', 'finished'])),
  station_permalink: loose(v.string()),
  station_urn: loose(v.string()),
  streamable: loose(v.boolean()),
  tag_list: loose(v.string()),
  title: v.string(),
  track_authorization: loose(v.string()),
  uri: loose(v.string()),
  urn: loose(v.string()),
  user: loose(scUserSchema),
  user_id: loose(v.number()),
  visuals: loose(v.unknown()),
  waveform_url: loose(v.string()),
})

/** Playlists return unresolved tracks as bare stubs; only `id` is guaranteed. */
export const scTrackStubSchema = v.looseObject({
  id: v.number(),
  kind: loose(v.string()),
  monetization_model: loose(v.string()),
  policy: loose(v.string()),
})

export const scTrackOrStubSchema = v.union([scTrackSchema, scTrackStubSchema])

export const scTrackSearchSchema = scSearchOf(scTrackSchema)

export const scSecretTokenSchema = v.looseObject({
  kind: loose(v.literal('secret-token')),
  resource_uri: loose(v.string()),
  token: v.string(),
  uri: loose(v.string()),
})
