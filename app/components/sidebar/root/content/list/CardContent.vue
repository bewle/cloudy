<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div :class="cn('flex flex-col justify-around h-full *:text-clip mr-auto', $props.class)">
    <slot />
  </div>
</template>
