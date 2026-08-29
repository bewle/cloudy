import type * as v from 'valibot'

import type {
  scActivityCollectionSchema,
  scActivitySchema,
  scConnectionSchema,
} from '../../schemas/soundcloud/me'

export type SCActivityCollection = v.InferOutput<typeof scActivityCollectionSchema>
export type SCActivity = v.InferOutput<typeof scActivitySchema>
export type SCConnection = v.InferOutput<typeof scConnectionSchema>
