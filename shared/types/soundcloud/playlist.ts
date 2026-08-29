import type * as v from 'valibot'

import type { scPlaylistSchema, scPlaylistSearchSchema } from '../../schemas/soundcloud/playlist'
import type { SCFilter } from './api'

export type SCPlaylist = v.InferOutput<typeof scPlaylistSchema>
export type SCPlaylistSearch = v.InferOutput<typeof scPlaylistSearchSchema>

export interface SCPlaylistFilter extends SCFilter {
  'filter.genre_or_tag'?: string
}
