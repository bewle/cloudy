<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    :class="
      cn('h-13 py-2 px-2.5 items-center flex items-center bg-surface flex-row gap-2', props.class)
    "
  >
    <slot />
  </div>
</template>
