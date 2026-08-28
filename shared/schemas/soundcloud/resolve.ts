import * as v from 'valibot'

import { scPlaylistSchema } from './playlist'
import { scTrackSchema } from './track'
import { scUserSchema } from './user'

export const scResolveSchema = v.variant('kind', [scTrackSchema, scUserSchema, scPlaylistSchema])
