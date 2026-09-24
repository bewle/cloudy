<script lang="ts">
import type { SelectItemProps } from 'reka-ui'
import { useForwardProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

import { buttonStyles } from '../Button.vue'

export const popoverItemStyles = tv({
  extend: buttonStyles,
  variants: {
    size: {
      default: 'rounded-sm',
    },
    variant: {
      default:
        'relative flex w-full cursor-default items-center gap-2 rounded-sm justify-start not-[[data-state=active],[data-state=on]]:hover:(bg-transparent ring-0) data-[highlighted]:hover:(bg-surface-raised-hover) focus-visible:(bg-surface-raised-hover text-foreground ring-0) data-[state=active]:(bg-surface-raised-hover text-foreground)',
    },
  },
})
</script>

<script setup lang="ts">
const props = defineProps<SelectItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectItem
    data-slot="select-item"
    v-bind="forwardedProps"
    :class="cn(popoverItemStyles(), props.class)"
  >
    <span class="size-4 right-2 top-1/2 absolute -translate-y-1/2">
      <SelectItemIndicator class="size-full">
        <slot name="select-indicator-icon">
          <Icon :name="ICON__CHECK" />
        </slot>
      </SelectItemIndicator>
    </span>

    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>
