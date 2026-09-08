<script lang="ts" setup generic="T extends object">
import type { VirtualizerOptions } from '@tanstack/vue-virtual'
import { useVirtualizer, type PartialKeys } from '@tanstack/vue-virtual'

const props = defineProps<{ list: T[]; itemKey: keyof T; showSentinel?: boolean }>()
const emit = defineEmits<{
  sentinel: [intersecting: boolean]
}>()

const viewport = useTemplateRef('viewport')
const rowVirtualizer = useVirtualizer(
  computed<
    PartialKeys<
      VirtualizerOptions<HTMLElement, Element>,
      'observeElementRect' | 'observeElementOffset' | 'scrollToFn'
    >
  >(() => ({
    count: props.list.length,
    estimateSize: () => 90,
    gap: 8,
    getItemKey: index => {
      const item = props.list[index]!
      return item[props.itemKey] as number | string | bigint
    },
    getScrollElement: () => viewport.value?.viewportElement ?? null,
    overscan: 5,
  })),
)

const loadSentinel = useTemplateRef('loadSentinel')
useIntersectionObserver(loadSentinel, entries => {
  emit(
    'sentinel',
    entries.some(e => e.isIntersecting),
  )
})
</script>

<template>
  <UScrollAreaRoot>
    <UScrollAreaViewport ref="viewport" class="pe-3.5">
      <div class="w-full relative" :style="{ height: `${rowVirtualizer.getTotalSize()}px` }">
        <slot :row-virtualizer />
      </div>

      <div
        v-if="showSentinel"
        ref="loadSentinel"
        style="height: 5.625rem"
        class="mt-2 flex w-full items-center justify-center"
      >
        <USpinner class="text-2xl size-1lh" />
      </div>
    </UScrollAreaViewport>

    <UScrollAreaScrollbars :horizontal="false" />
  </UScrollAreaRoot>
</template>
