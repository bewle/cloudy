import type * as v from 'valibot'

import type { scAppSchema, scOembedSchema } from '../../schemas/soundcloud/api'
import type { scKindSchema, scSearchSchema } from '../../schemas/soundcloud/common'

export type SCKind = v.InferOutput<typeof scKindSchema>

export type SCImageFormat =
  | 'original'
  | 't500x500'
  | 'crop'
  | 't300x300'
  | 'large'
  | 't67x67'
  | 'badge'
  | 'small'
  | 'tiny'
  | 'mini'

export type SCApp = v.InferOutput<typeof scAppSchema>

export interface SCOembedFilter {
  url: string
  format?: string
  callback?: string
  maxwidth?: string
  maxheight?: string
  color?: string
  auto_play?: boolean
  show_comments?: boolean
  iframe?: boolean
}

export type SCOembed = v.InferOutput<typeof scOembedSchema>
export type SCSearch = v.InferOutput<typeof scSearchSchema>

export interface SCFilter {
  q: string
  limit?: number
  offset?: number
}
