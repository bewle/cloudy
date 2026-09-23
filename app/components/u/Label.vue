<script lang="ts" setup>
import type { LabelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export type ULabelProps = LabelProps & { class?: HTMLAttributes['class'] }

const props = defineProps<ULabelProps>()

const delegated = reactiveOmit(props, 'class')
</script>

<template>
  <Label
    v-bind="delegated"
    :class="cn('flex items-center gap-2 text-sm leading-none font-medium select-none', props.class)"
    data-slot="label"
  >
    <slot />
  </Label>
</template>
