import type { VirtualizerOptions } from '@tanstack/vue-virtual'
import { useVirtualizer, type PartialKeys } from '@tanstack/vue-virtual'

export type FlatBatch =
  | {
      type: 'heading'
      id: string
      name: string
      source: SidebarTrackSourceKey
    }
  | {
      type: 'entry'
      url: string
      last: boolean
      key: string
      entry: DownloadEntry
    }
  | {
      type: 'separator'
      id: number
    }

const ROW_HEIGHT = 52
const HEADER_HEIGHT = 26
const SEPARATOR_HEIGHT = 12

export const useDownloadsVirtualizer = (
  flatBatches: MaybeRefOrGetter<FlatBatch[]>,
  scrollElement: MaybeRefOrGetter<HTMLElement | null>,
) =>
  useVirtualizer(
    computed<
      PartialKeys<
        VirtualizerOptions<HTMLElement, Element>,
        'observeElementRect' | 'observeElementOffset' | 'scrollToFn'
      >
    >(() => {
      const flatBatchesValue = toValue(flatBatches)
      const scrollElementValue = toValue(scrollElement)
      return {
        count: flatBatchesValue.length,
        estimateSize: i => {
          const item = flatBatchesValue[i]!
          switch (item.type) {
            case 'heading':
              return HEADER_HEIGHT
            case 'entry':
              return ROW_HEIGHT
            case 'separator':
              return SEPARATOR_HEIGHT
            default:
              return ROW_HEIGHT
          }
        },
        gap: 0,
        getItemKey: index => {
          const item = flatBatchesValue[index]!
          return item.type === 'entry' ? item.key : item.id
        },
        getScrollElement: () => scrollElementValue,
        overscan: 5,
      }
    }),
  )
