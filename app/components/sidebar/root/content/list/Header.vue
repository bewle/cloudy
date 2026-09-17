<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    :class="
      cn('h-6.5 py-1 px-1.5 items-center flex items-center bg-surface flex-row gap-2', props.class)
    "
  >
    <slot />
  </div>
</template>
