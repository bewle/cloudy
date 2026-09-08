<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

import type { NuxtLinkProps } from '#app'

interface Props extends NuxtLinkProps {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  external: true,
  target: '_blank',
})

const delegated = reactiveOmit(props, 'class')
</script>

<template>
  <NuxtLink
    v-bind="delegated"
    :class="
      cn('hover:underline underline-offset-px font-medium truncate py-0.5 -my-0.5', props.class)
    "
  >
    <slot />
  </NuxtLink>
</template>
