import type { GenericSchema } from 'valibot'
import * as v from 'valibot'

import { SC__OPTION_KINDS } from '../../constants/soundcloud'

export const scKindSchema = v.picklist(SC__OPTION_KINDS)

export const scLicenseSchema = v.picklist([
  'no-rights-reserved',
  'all-rights-reserved',
  'cc-by',
  'cc-by-nc',
  'cc-by-nd',
  'cc-by-sa',
  'cc-by-nc-nd',
  'cc-by-nc-sa',
])

export const scSharingSchema = v.picklist(['public', 'private'])
export const scEmbeddableBySchema = v.picklist(['all', 'me', 'none'])

export const scSearchSchema = v.looseObject({
  next_href: v.nullable(v.string()),
  query_urn: v.nullish(v.string()),
  total_results: v.optional(v.number()),
})

export function scSearchOf<const Item extends GenericSchema>(item: Item) {
  return v.looseObject({
    ...scSearchSchema.entries,
    collection: v.array(item),
  })
}
