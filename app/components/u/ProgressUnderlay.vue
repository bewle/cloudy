<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

export interface UProgressUnderlayProps {
  class?: HTMLAttributes['class']
  progress?: number
  dim?: boolean
}

const props = withDefaults(defineProps<UProgressUnderlayProps>(), {
  progress: 0,
})
</script>

<template>
  <div
    :class="
      cn(
        'bg-primary/10 h-full inset-0 absolute pointer-events-none',
        dim && 'bg-primary/5',
        props.class,
      )
    "
    :style="{
      width: `${progress * 100}%`,
    }"
  />
</template>
