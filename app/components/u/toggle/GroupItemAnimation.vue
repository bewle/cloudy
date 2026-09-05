<script lang="ts" setup>
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

import { injectToggleGroupAnimationContext } from './GroupRoot.vue'

export interface UToggleGroupItemAnimationProps extends PrimitiveProps {
  class?: HTMLAttributes['class']
}

const { animating, nodePresent } = injectToggleGroupAnimationContext()

const props = withDefaults(defineProps<UToggleGroupItemAnimationProps>(), {
  as: 'span',
})
const delegated = reactiveOmit(props, 'class')

onMounted(() => (nodePresent.value = true))
onUnmounted(() => (nodePresent.value = false))
</script>

<template>
  <Primitive
    v-bind="delegated"
    aria-hidden="true"
    data-slot="toggle-group-animation"
    :class="
      cn(
        'position-anchor-toggle anchor-inset rounded ease-snappy absolute bg-surface-active pointer-events-none',
        animating && 'duration-100',
        props.class,
      )
    "
  />
</template>
