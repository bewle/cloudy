import type * as v from 'valibot'

import type {
  SC__TRACK_SEARCH_SUMMARY_KEYS,
  SC__TRACK_SUMMARY_KEYS,
  SC__TRANSCODING_MIME_TYPE_REGEX_MAP,
} from '../../constants/soundcloud'
import type { scLicenseSchema } from '../../schemas/soundcloud/common'
import type {
  scPublisherMetadataSchema,
  scSecretTokenSchema,
  scTrackOrStubSchema,
  scTrackSchema,
  scTrackSearchSchema,
  scTrackStubSchema,
  scTranscodingSchema,
} from '../../schemas/soundcloud/track'
import type { SCFilter } from './api'

export type SCTranscodingType = keyof typeof SC__TRANSCODING_MIME_TYPE_REGEX_MAP
export type SCTrackSummary = Omit<
  Pick<SCTrack, (typeof SC__TRACK_SUMMARY_KEYS)[number]>,
  'user'
> & { user: SCUserMiniSummary }
export type SCLicense = v.InferOutput<typeof scLicenseSchema>

export type SCTrackType =
  | 'original'
  | 'remix'
  | 'live'
  | 'recording'
  | 'spoken'
  | 'podcast'
  | 'demo'
  | 'in progress'
  | 'stem'
  | 'loop'
  | 'sound effect'
  | 'sample'
  | 'other'

export type SCTrack = v.InferOutput<typeof scTrackSchema>
export type SCTrackStub = v.InferOutput<typeof scTrackStubSchema>
export type SCTrackOrStub = v.InferOutput<typeof scTrackOrStubSchema>
export type SCTrackSearch = v.InferOutput<typeof scTrackSearchSchema>
export interface SCTrackSearchSummary extends Omit<
  Pick<SCTrackSearch, (typeof SC__TRACK_SEARCH_SUMMARY_KEYS)[number]>,
  'collection'
> {
  collection: (SCTrackSummary | SCTrackStub)[]
}
export type SCSecretToken = v.InferOutput<typeof scSecretTokenSchema>
export type SCTranscoding = v.InferOutput<typeof scTranscodingSchema>
export type SCPublisherMetadata = v.InferOutput<typeof scPublisherMetadataSchema>

export interface SCTrackFilter extends SCFilter {
  'filter.genre_or_tag'?: string
  'filter.duration'?: 'short' | 'medium' | 'long' | 'epic'
  'filter.created_at'?: 'last_hour' | 'last_day' | 'last_week' | 'last_month' | 'last_year'
  'filter.license'?: 'to_modify_commercially' | 'to_share' | 'to_use_commercially'
}
