import { RE__SC_TRANSCODING_MIME_TYPES } from '../regex/soundcloud'
import type { SCTrack } from '../types/soundcloud/track'
import type { SCUser } from '../types/soundcloud/user'

export const SC__API_URL = 'https://api-v2.soundcloud.com'
export const SC__SITE_URL = 'https://soundcloud.com'
export const SC__OPTION_KINDS = ['track', 'user', 'playlist'] as const
export const SC__TRANSCODING_EXTENSION_MAP = {
  aac: '.m4a',
  mp3: '.mp3',
  opus: '.opus',
} as const
export const SC__TRANSCODING_MIME_TYPE_MAP = {
  aac: 'audio/mp4; codecs="mp4a.40.2"',
  mp3: 'audio/mpeg',
  opus: 'audio/ogg',
} as const
export const SC__TRANSCODING_MIME_TYPE_REGEX_MAP = {
  aac: RE__SC_TRANSCODING_MIME_TYPES[0],
  mp3: RE__SC_TRANSCODING_MIME_TYPES[1],
  opus: RE__SC_TRANSCODING_MIME_TYPES[2],
} as const
export const SC__IMAGE_FORMAT_EXTENSIONS = ['.jpg', '.png'] as const
export const SC__IMAGE_QUALITY_TIERS_DESC: readonly SCImageFormat[] = [
  'original',
  't500x500',
  't300x300',
  'large',
  'small',
]

export const SC__TRACK_SUMMARY_KEYS = [
  'artwork_url',
  'created_at',
  'description',
  'genre',
  'id',
  'permalink_url',
  'publisher_metadata',
  'title',
  'user',
] as const satisfies readonly (keyof SCTrack)[]

export const SC__USER_SUMMARY_KEYS = [
  'avatar_url',
  'permalink_url',
  'username',
] as const satisfies readonly (keyof SCUser)[]

export const SC__RESERVED_PATHS: readonly string[] = [
  'discover',
  'feed',
  'search',
  'settings',
  'stream',
  'upload',
  'you',
]
