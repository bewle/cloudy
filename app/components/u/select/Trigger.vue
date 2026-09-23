<script lang="ts" setup>
import type { SelectTriggerProps } from 'reka-ui'

import { buttonStyles, type UButtonProps } from '../Button.vue'

export interface USelectTriggerProps extends SelectTriggerProps, UButtonProps {}

const props = defineProps<USelectTriggerProps>()

const delegated = reactiveOmit(props, ['class', 'variant', 'size'])
</script>

<template>
  <SelectTrigger
    v-bind="delegated"
    :class="cn(buttonStyles({ variant, size }), props.class)"
    data-slot="select-trigger"
  >
    <slot />
  </SelectTrigger>
</template>
