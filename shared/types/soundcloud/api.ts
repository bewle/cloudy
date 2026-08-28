export type SCKind = (typeof SC__OPTION_KINDS)[number]

export type SCImageFormat =
  | 't500x500'
  | 'crop'
  | 't300x300'
  | 'large'
  | 't67x67'
  | 'badge'
  | 'small'
  | 'tiny'
  | 'mini'

export interface SCApp {
  id: number
  kind: 'app'
  name: string
  uri: string
  permalink_url: string
  external_url: string
  creator: string
}

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

export interface SCOembed {
  version: string
  type: string
  provider_name: string
  provider_url: string
  height: number
  width: string
  title: string
  description: string
  html: string
  thumbnail_url?: string
  author_name?: string
  author_url?: string
}

export interface SCSearch {
  total_results: number
  next_href: string
  query_urn: string
}

export interface SCFilter {
  q: string
  limit?: number
  offset?: number
}
