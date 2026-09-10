<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

export interface UProgressUnderlayProps {
  class?: HTMLAttributes['class']
  progress?: number
}

const props = withDefaults(defineProps<UProgressUnderlayProps>(), {
  progress: 0,
})
</script>

<template>
  <div
    :class="cn('bg-primary/10 h-full inset-0 absolute pointer-events-none', props.class)"
    :style="{
      width: `${progress * 100}%`,
    }"
  />
</template>
