<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { VariantProps } from 'tailwind-variants'
import type { HTMLAttributes } from 'vue'

export const buttonStyles = tv({
  base: 'inline-flex items-center font-medium select-none shrink-0 gap-2 outline-none focus-visible:ring-2 ring-border-strong disabled:(opacity-50 pointer-events-none)',
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
  variants: {
    size: {
      default: 'px-2.5 h-8 text-sm rounded',
      icon: 'size-8 aspect-square text-base rounded',
      lg: 'px-3 h-9 text-base rounded',
      sm: 'px-2 h-7 text-xs rounded',
    },
    variant: {
      default:
        // 'text-muted-foreground not-[[data-state=active],[data-state=on]]:hover:(bg-background-hover text-foreground) active:(bg-background-active text-foreground) focus-visible:bg-background-hover data-[state=active]:(bg-background-active text-foreground) data-[state=on]:(bg-background-active text-foreground)',
        'text-muted-foreground not-[[data-state=active],[data-state=on]]:hover:(bg-background-hover text-foreground) active:(bg-background-active text-foreground) focus-visible:bg-background-hover',
      outline:
        // 'bg-surface not-[[data-state=active],[data-state=on]]:hover:(bg-surface-hover border-border-hover) active:(bg-surface-active border-border-active) focus-visible:bg-surface-hover border border-border data-[state=active]:(bg-surface-active border-border-active) data-[state=on]:(bg-surface-active border-border-active)',
        'bg-surface not-[[data-state=active],[data-state=on]]:hover:(bg-surface-hover border-border-hover) active:(bg-surface-active border-border-active) focus-visible:bg-surface-hover border border-border ',
    },
  },
})
export type ButtonStyles = VariantProps<typeof buttonStyles>
</script>

<script lang="ts" setup>
export interface UButtonProps extends PrimitiveProps {
  class?: HTMLAttributes['class']
  variant?: ButtonStyles['variant']
  size?: ButtonStyles['size']
  isLoading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<UButtonProps>(), {
  as: 'button',
})

const delegated = reactiveOmit(props, 'class')
</script>

<template>
  <Primitive
    v-bind="delegated"
    :disabled="disabled || isLoading"
    :class="
      cn(
        buttonStyles({ variant, size }),
        isLoading && 'grid *:col-start-1 *:row-start-1 *:not-first:opacity-0',
        props.class,
      )
    "
    data-slot="button"
  >
    <LazyUSpinner v-if="isLoading" class="mx-auto shrink-0" />
    <slot />
  </Primitive>
</template>
