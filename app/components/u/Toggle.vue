<script lang="ts" setup>
import type { ToggleEmits, ToggleProps } from 'reka-ui'
import { useForwardPropsEmits } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

import { buttonStyles, type UButtonProps } from './Button.vue'

export interface UToggleProps extends ToggleProps, UButtonProps {
  class?: HTMLAttributes['class']
}
export type UToggleEmits = ToggleEmits

const props = defineProps<UToggleProps>()
const emits = defineEmits<UToggleEmits>()

const delegated = reactiveOmit(props, ['class', 'variant', 'size'])
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <Toggle
    v-bind="forwarded"
    :class="cn(buttonStyles({ variant, size }), props.class)"
    data-slot="toggle"
  >
    <slot />
  </Toggle>
</template>
