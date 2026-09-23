<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { VariantProps } from 'tailwind-variants'
import type { HTMLAttributes } from 'vue'

export const badgeStyles = tv({
  base: 'font-medium',
  variants: {
    size: {
      default: 'text-xs rounded-sm px-1.25',
    },
    variant: {
      soft: 'bg-surface-raised border-0',
      default: 'bg-surface border border-border',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
})

export type BadgeStyles = VariantProps<typeof badgeStyles>
</script>

<script lang="ts" setup>
export interface UBadgeProps extends PrimitiveProps {
  class?: HTMLAttributes['class']
  variant?: BadgeStyles['variant']
  size?: BadgeStyles['size']
}

const props = defineProps<UBadgeProps>()

const delegated = reactiveOmit(props, 'class')
</script>

<template>
  <Primitive
    v-bind="delegated"
    :class="cn(badgeStyles({ variant, size }), props.class)"
    data-slot="badge"
  >
    <slot />
  </Primitive>
</template>
