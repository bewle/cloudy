import type { SCSearch } from './api'
import type { SCUser } from './user'

export interface SCComment {
  kind: 'comment'
  id: number
  created_at: string
  user_id: number
  track_id: number
  timestamp: number
  body: string
  user: SCUser
  self: {
    urn: string
  }
}

export interface SCCommentSearch extends SCSearch {
  collection: SCComment[]
}
