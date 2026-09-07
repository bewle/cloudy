<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div :class="cn('flex flex-col justify-center gap-3 *:text-clip', $props.class)">
    <slot />
  </div>
</template>
