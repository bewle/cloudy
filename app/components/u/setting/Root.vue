<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

export interface USettingRootProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<USettingRootProps>()
</script>

<template>
  <div :class="cn('flex flex-col gap-2', props.class)" data-slot="setting-root">
    <slot />
  </div>
</template>
