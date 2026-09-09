<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const delegated = reactiveOmit(props, 'class')
</script>

<template>
  <div v-bind="delegated" :class="cn('rounded-sm shrink-0 size-16', props.class)">
    <slot />
  </div>
</template>
