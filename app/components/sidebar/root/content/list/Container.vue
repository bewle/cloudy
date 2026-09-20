<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="
      cn(
        'relative min-h-full border-border border rounded of-clip divide-border divide-y has-[*]:border',
        props.class,
      )
    "
    data-slot="list-container"
  >
    <slot />
  </div>
</template>
