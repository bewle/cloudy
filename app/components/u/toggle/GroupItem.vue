<script lang="ts" setup>
import type { ToggleGroupItemProps } from 'reka-ui'
import { useForwardPropsEmits } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

import { buttonStyles, type UButtonProps } from '../Button.vue'
import { injectToggleGroupAnimationContext } from './GroupRoot.vue'

export interface UToggleGroupItemProps extends ToggleGroupItemProps, UButtonProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<UToggleGroupItemProps>()

const { nodePresent } = injectToggleGroupAnimationContext()

const delegated = reactiveOmit(props, ['class', 'asChild', 'as', 'variant', 'size', 'isLoading'])
const forwarded = useForwardPropsEmits(delegated)
</script>

<template>
  <ToggleGroupItem
    v-slot="slotProps"
    v-bind="forwarded"
    :class="
      cn(
        buttonStyles({ variant, size }),
        'relative z-1 hover:(border-border-hover) reka-active:(bg-surface-active! border-border-strong-active!)',
        nodePresent && 'reka-active:(anchor-name-toggle)',
        props.class,
      )
    "
    data-slot="toggle-group-item"
  >
    <slot v-bind="slotProps" />
  </ToggleGroupItem>
</template>
