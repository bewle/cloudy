<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="cn('text-xs text-muted-foreground font-mono', props.class)">
    <slot />
  </div>
</template>
