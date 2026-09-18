<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const delegated = reactiveOmit(props, 'class')
</script>

<template>
  <div
    v-bind="delegated"
    :class="cn('rounded-sm of-clip shrink-0 aspect-square h-full', props.class)"
  >
    <slot />
  </div>
</template>
