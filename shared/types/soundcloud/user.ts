import type * as v from 'valibot'

import type {
  scCreatorSubscriptionSchema,
  scUserCollectionSchema,
  scUserMiniSchema,
  scUserSchema,
  scUserSearchSchema,
  scVisualSchema,
  scWebProfileSchema,
} from '../../schemas/soundcloud/user'
import type { SCFilter } from './api'

export type SCUserMini = v.InferOutput<typeof scUserMiniSchema>
export type SCUser = v.InferOutput<typeof scUserSchema>
export type SCUserMiniSummary = Pick<SCUserMini, (typeof SC__USER_MINI_SUMMARY_KEYS)[number]>
export type SCUserSummary = Pick<SCUser, (typeof SC__USER_SUMMARY_KEYS)[number]>
export type SCUserSearch = v.InferOutput<typeof scUserSearchSchema>
export type SCWebProfile = v.InferOutput<typeof scWebProfileSchema>
export type SCUserCollection = v.InferOutput<typeof scUserCollectionSchema>
export type SCVisual = v.InferOutput<typeof scVisualSchema>
export type SCCreatorSubscription = v.InferOutput<typeof scCreatorSubscriptionSchema>

export interface SCUserFilter extends SCFilter {
  'filter.place'?: string
}
