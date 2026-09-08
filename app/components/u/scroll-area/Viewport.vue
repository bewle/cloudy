<script lang="ts" setup>
import type { ScrollAreaViewportProps } from 'reka-ui'

const props = defineProps<ScrollAreaViewportProps & { class?: string }>()
const delegated = reactiveOmit(props, 'class')

const viewport = useTemplateRef('viewport')
defineExpose({ viewportElement: computed(() => viewport.value?.viewportElement) })
</script>

<template>
  <ScrollAreaViewport
    ref="viewport"
    v-bind="delegated"
    :class="cn('size-full', $props.class)"
    data-slot="scroll-area-viewport"
  >
    <slot />
  </ScrollAreaViewport>
</template>
