<script lang="ts" setup generic="T extends string[]">
import type { HTMLAttributes } from 'vue'

import type { USelectRootProps } from '../select/Root.vue'

export interface USettingPicklistProps<T> extends USelectRootProps<T> {
  options: T
  class?: HTMLAttributes['class']
}

const props = defineProps<USettingPicklistProps<T>>()
</script>

<template>
  <USelectRoot v-bind="props" data-slot="setting-picklist" v-slot="{ modelValue }">
    <USelectTrigger> {{ modelValue }} </USelectTrigger>

    <USelectContent>
      <USelectItem v-for="option in options" :key="option" :value="option">
        <USelectItemText> {{ option }} </USelectItemText>
      </USelectItem>
    </USelectContent>
  </USelectRoot>
</template>
