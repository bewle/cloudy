<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

export interface UEmptyStateDescriptionProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<UEmptyStateDescriptionProps>()
</script>

<template>
  <p :class="cn('text-muted-foreground text-sm', props.class)" data-slot="empty-state-description">
    <slot />
  </p>
</template>
