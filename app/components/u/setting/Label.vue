<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

export interface USettingLabelProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<USettingLabelProps>()
</script>

<template>
  <ULabel :class="cn('text-lg', props.class)" data-slot="SettingLabel">
    <slot />
  </ULabel>
</template>
