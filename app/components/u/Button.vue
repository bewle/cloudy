<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { VariantProps } from 'tailwind-variants'
import type { HTMLAttributes } from 'vue'

export const buttonStyles = tv({
  base: 'inline-flex items-center justify-center font-medium select-none shrink-0 gap-2 outline-none focus-visible:ring-2 ring-border-strong disabled:(opacity-50 pointer-events-none)',
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
      'default':
        'text-muted-foreground not-reka-active:hover:(bg-background-hover text-foreground) focus-visible:bg-background-hover reka-active:(bg-background-active text-foreground)',
      'soft':
        'text-muted-foreground bg-surface border border-border not-reka-active:hover:(bg-surface-hover border-border-strong text-foreground border-border-strong) focus-visible:bg-surface-hover reka-active:(bg-surface-active border-border-strong-active text-foreground)',
      'ghost-danger':
        'text-danger-foreground not-reka-active:hover:(bg-danger-hover text-foreground) active:(bg-danger-active text-foreground) focus-visible:bg-danger-hover',
      'outline':
        'bg-surface not-reka-active:hover:(bg-surface-hover border-border-hover) focus-visible:bg-surface-hover border border-border reka-active:(bg-surface-active border-border-active)',
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
