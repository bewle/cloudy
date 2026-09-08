<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <p :class="cn('text-sm text-muted-foreground truncate py-0.5 -my-0.5', props.class)">
    <slot />
  </p>
</template>
