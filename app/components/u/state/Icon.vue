<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

export interface UEmptyStateIconProps {
  class?: HTMLAttributes['class']
  name: string
}

const props = defineProps<UEmptyStateIconProps>()
</script>

<template>
  <Icon
    :name
    :class="cn('text-muted-foreground text-6xl size-1lh', props.class)"
    data-slot="empty-state-icon"
  />
</template>
