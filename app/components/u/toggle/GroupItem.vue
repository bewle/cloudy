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
    v-bind="forwarded"
    :class="
      cn(
        buttonStyles({ variant, size }),
        'relative z-1',
        nodePresent && 'data-[active]:(anchor-name-toggle bg-surface-active)',
        props.class,
      )
    "
    data-slot="toggle-group-item"
  >
    <slot />
  </ToggleGroupItem>
</template>
