<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

export interface UEmptyStateRootProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<UEmptyStateRootProps>()
</script>

<template>
  <div
    :class="cn('flex flex-col gap-2 items-center text-center text-balance', props.class)"
    data-slot="empty-state-root"
    role="status"
    aria-live="polite"
  >
    <slot />
  </div>
</template>
