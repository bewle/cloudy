<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

export interface USkeletonProps {
  class?: HTMLAttributes['class']
  delay?: number
  shimmer?: boolean
}

const props = withDefaults(defineProps<USkeletonProps>(), {
  delay: 1400,
  shimmer: true,
})

const delegated = reactiveOmit(props, 'class')
</script>

<template>
  <div
    v-bind="delegated"
    :class="cn('rounded-sm bg-secondary-raised relative overflow-clip', props.class)"
    data-slot="skeleton"
    aria-busy
  >
    <div
      v-if="shimmer"
      class="bg-gradient-linear size-full ease from-transparent to-transparent via-foreground/3 bg-gradient-to-r/oklch"
      :style="{
        animation: `skeleton ${delay}ms infinite`,
        willChange: 'transform',
      }"
    />
  </div>
</template>

<style>
@keyframes skeleton {
  0% {
    translate: -100% 0;
  }

  100% {
    translate: 300% 0;
  }
}
</style>
