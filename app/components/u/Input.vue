<script lang="ts">
import type { VariantProps } from 'tailwind-variants'
import type { HTMLAttributes } from 'vue'

import { buttonStyles } from './Button.vue'

export const inputStyles = tv({
  base: 'font-normal ',
  defaultVariants: {
    variant: 'outline',
  },
  extend: buttonStyles,
  variants: {
    variant: {
      outline:
        'bg-surface not-[[data-state=active],[data-state=on]]:hover:(bg-surface border-border-hover) focus-visible:(bg-surface ring-0 border-border-hover)',
    },
  },
})
export type ButtonStyles = VariantProps<typeof buttonStyles>
</script>

<script lang="ts" setup>
export interface UInputProps {
  class?: HTMLAttributes['class']
  defaultValue?: string | number
  modelValue?: string | number
}

const props = defineProps<UInputProps>()
const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: props.defaultValue,
  passive: true,
})
</script>

<template>
  <input v-model="modelValue" :class="cn(inputStyles(), props.class)" data-slot="input" />
</template>
