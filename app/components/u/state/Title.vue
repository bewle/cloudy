<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

export interface UEmptyStateTitleProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<UEmptyStateTitleProps>()
</script>

<template>
  <h2 :class="cn('font-medium text-xl', props.class)" data-slot="empty-state-title">
    <slot />
  </h2>
</template>
