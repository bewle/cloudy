import type { VirtualizerOptions } from '@tanstack/vue-virtual'
import { useVirtualizer, type PartialKeys } from '@tanstack/vue-virtual'

export const useListVirtualizer = <T>(
  list: MaybeRefOrGetter<T[]>,
  scrollElement: MaybeRefOrGetter<HTMLElement | null>,
  {
    estimateSize,
    getItemKey,
  }: { estimateSize: (item: T) => number; getItemKey: (item: T) => number | string },
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
        estimateSize: i => estimateSize(listValue[i]!),
        getItemKey: i => getItemKey(listValue[i]!),
        getScrollElement: () => scrollElementValue,
        overscan: 5,
      }
    }),
  )
