import type { GenericSchema } from 'valibot'
import * as v from 'valibot'

import type { SC__OPTION_KINDS } from '../../constants/soundcloud'

export function loose<const Schema extends GenericSchema>(schema: Schema) {
  return v.nullish(schema)
}

export function scKind<const K extends (typeof SC__OPTION_KINDS)[number]>(kind: K) {
  return v.literal(kind)
}

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
  next_href: loose(v.string()),
  query_urn: loose(v.string()),
  total_results: loose(v.number()),
})

/** Wraps an item schema in SoundCloud's paginated search envelope. */
export function scSearchOf<const Item extends GenericSchema>(item: Item) {
  return v.looseObject({
    ...scSearchSchema.entries,
    collection: v.array(item),
  })
}
