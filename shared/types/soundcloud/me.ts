import type { SCPlaylist } from './playlist'

export interface SCActivityCollection {
  collection: SCActivity[]
  next_href: string
  future_href: string
}

export interface SCActivity {
  origin: SCPlaylist
  tags: string | null
  created_at: string
  type: string
}

export interface SCConnection {
  created_at: string
  display_name: string
  id: number
  post_favorite: boolean
  post_publish: false
  service: string
  type: string
  uri: string
}
