import type { VirtualizerOptions } from '@tanstack/vue-virtual'
import { useVirtualizer, type PartialKeys } from '@tanstack/vue-virtual'

export const useTrackSourceVirtualizer = (
  list: MaybeRefOrGetter<TrackRow[]>,
  scrollElement: MaybeRefOrGetter<HTMLElement | null>,
) =>
  useVirtualizer(
    computed<
      PartialKeys<
        VirtualizerOptions<HTMLElement, Element>,
        'observeElementRect' | 'observeElementOffset' | 'scrollToFn'
      >
    >(() => {
      const listValue = toValue(list)
      const scrollElementValue = toValue(scrollElement)
      return {
        count: listValue.length,
        estimateSize: () => 52,
        gap: 0,
        getItemKey: index => listValue[index]!.url,
        getScrollElement: () => scrollElementValue,
        overscan: 5,
      }
    }),
  )
