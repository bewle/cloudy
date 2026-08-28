import type { SCFilter, SCSearch } from './api'

export interface SCUserMini {
  avatar_url: string
  id: number
  kind: string
  permalink_url: string
  uri: string
  username: string
  permalink: string
  last_modified: string
}

export interface SCUser {
  avatar_url: string
  city: string
  comments_count: number
  country_code: number | null
  created_at: string
  creator_subscriptions: SCCreatorSubscription[]
  creator_subscription: SCCreatorSubscription
  description: string
  followers_count: number
  followings_count: number
  first_name: string
  full_name: string
  groups_count: number
  id: number
  kind: string
  last_modified: string
  last_name: string
  likes_count: number
  playlist_likes_count: number
  permalink: string
  permalink_url: string
  playlist_count: number
  reposts_count: number | null
  track_count: number
  uri: string
  urn: string
  username: string
  verified: boolean
  visuals: {
    urn: string
    enabled: boolean
    visuals: SCVisual[]
    tracking: null
  }
}

export interface SCUserSearch extends SCSearch {
  collection: SCUser[]
}

export interface SCWebProfile {
  network: string
  title: string
  url: string
  username: string | null
}

export interface SCUserCollection {
  collection: SCUser
  next_href: string | null
}

export interface SCVisual {
  urn: string
  entry_time: number
  visual_url: string
}

export interface SCCreatorSubscription {
  product: {
    id: string
  }
}

export interface SCUserFilter extends SCFilter {
  'filter.place'?: string
}
