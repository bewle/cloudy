<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div :class="cn('p-3 border border-border rounded bg-surface flex gap-3', props.class)">
    <slot />
  </div>
</template>
