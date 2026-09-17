<script lang="ts" setup>
import type { Virtualizer } from '@tanstack/vue-virtual'

defineProps<{
  showSentinel?: boolean
  virtualizer: Virtualizer<HTMLElement, Element>
}>()
const emit = defineEmits<{
  sentinel: [intersecting: boolean]
}>()

const viewport = useTemplateRef('viewport')

const loadSentinel = useTemplateRef('loadSentinel')
useIntersectionObserver(loadSentinel, entries => {
  emit(
    'sentinel',
    entries.some(e => e.isIntersecting),
  )
})

defineExpose({ viewportRef: viewport })
</script>

<template>
  <UScrollAreaRoot>
    <UScrollAreaViewport ref="viewport" class="pe-3.5">
      <div class="min-h-fit w-full relative" :style="{ height: `${virtualizer.getTotalSize()}px` }">
        <slot />
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
