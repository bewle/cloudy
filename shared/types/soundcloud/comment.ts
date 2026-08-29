import type * as v from 'valibot'

import type { scCommentSchema, scCommentSearchSchema } from '../../schemas/soundcloud/comment'

export type SCComment = v.InferOutput<typeof scCommentSchema>
export type SCCommentSearch = v.InferOutput<typeof scCommentSearchSchema>
