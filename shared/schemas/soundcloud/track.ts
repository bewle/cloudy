import * as v from 'valibot'

import { scEmbeddableBySchema, scLicenseSchema, scSearchOf, scSharingSchema } from './common'
import { scUserMiniSchema } from './user'

export const scTranscodingSchema = v.looseObject({
  duration: v.number(),
  format: v.looseObject({
    mime_type: v.string(),
    protocol: v.string(),
  }),
  preset: v.string(),
  quality: v.string(),
  snipped: v.boolean(),
  url: v.string(),
})

export const scPublisherMetadataSchema = v.looseObject({
  album_title: v.optional(v.nullable(v.string())),
  artist: v.optional(v.nullable(v.string())),
  c_line: v.optional(v.nullable(v.string())),
  c_line_for_display: v.optional(v.nullable(v.string())),
  contains_music: v.optional(v.boolean()),
  explicit: v.optional(v.nullable(v.boolean())),
  id: v.number(),
  isrc: v.optional(v.nullable(v.string())),
  p_line: v.optional(v.nullable(v.string())),
  p_line_for_display: v.optional(v.nullable(v.string())),
  publisher: v.optional(v.nullable(v.string())),
  release_title: v.optional(v.nullable(v.string())),
  upc_or_ean: v.optional(v.nullable(v.string())),
  urn: v.string(),
  writer_composer: v.optional(v.nullable(v.string())),
})

export const scTrackSchema = v.looseObject({
  artwork_url: v.nullable(v.string()),
  caption: v.nullable(v.string()),
  comment_count: v.number(),
  commentable: v.boolean(),
  created_at: v.string(),
  description: v.nullable(v.string()),
  display_date: v.string(),
  download_count: v.number(),
  downloadable: v.boolean(),
  duration: v.number(),
  embeddable_by: scEmbeddableBySchema,
  full_duration: v.number(),
  genre: v.nullable(v.string()),
  has_downloads_left: v.boolean(),
  id: v.number(),
  kind: v.literal('track'),
  label_name: v.nullable(v.string()),
  last_modified: v.string(),
  license: scLicenseSchema,
  likes_count: v.number(),
  media: v.looseObject({
    transcodings: v.array(scTranscodingSchema),
  }),
  monetization_model: v.string(),
  permalink: v.string(),
  permalink_url: v.string(),
  playable: v.optional(v.boolean()),
  playback_count: v.number(),
  policy: v.string(),
  public: v.boolean(),
  publisher_metadata: v.nullable(scPublisherMetadataSchema),
  purchase_title: v.nullable(v.string()),
  purchase_url: v.nullable(v.string()),
  release_date: v.nullable(v.string()),
  reposts_count: v.number(),
  secret_token: v.nullable(v.string()),
  sharing: scSharingSchema,
  state: v.picklist(['processing', 'failed', 'finished']),
  station_permalink: v.optional(v.string()),
  station_urn: v.optional(v.string()),
  streamable: v.boolean(),
  tag_list: v.string(),
  title: v.string(),
  track_authorization: v.optional(v.string()),
  track_format: v.optional(v.string()),
  uri: v.string(),
  urn: v.string(),
  user: scUserMiniSchema,
  user_id: v.number(),
  visuals: v.nullable(v.unknown()),
  waveform_url: v.string(),
})

export const scTrackStubSchema = v.looseObject({
  id: v.number(),
  kind: v.optional(v.literal('track')),
  monetization_model: v.optional(v.string()),
  policy: v.optional(v.string()),
})

export const scTrackOrStubSchema = v.union([scTrackSchema, scTrackStubSchema])
export const scTrackSearchSchema = scSearchOf(scTrackSchema)

export const scSecretTokenSchema = v.looseObject({
  kind: v.literal('secret-token'),
  resource_uri: v.string(),
  token: v.string(),
  uri: v.string(),
})
