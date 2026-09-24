<script lang="ts" setup generic="T extends string[]">
import { useForwardPropsEmits } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

import type { ButtonStyles } from '../Button.vue'
import type { USelectRootEmits, USelectRootProps } from '../select/Root.vue'

export interface USettingPicklistProps<T> extends USelectRootProps<T> {
  options: T
  class?: HTMLAttributes['class']
  variant?: ButtonStyles['variant']
  size?: ButtonStyles['size']
  ui?: Partial<Record<'trigger', string>>
}
export type USettingPicklistEmits<T> = USelectRootEmits<T>

const props = defineProps<USettingPicklistProps<T>>()
const emits = defineEmits<USettingPicklistEmits<T>>()

const delegated = reactiveOmit(props, ['options', 'variant', 'size'])
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <USelectRoot v-slot="{ modelValue }" v-bind="forwarded" data-slot="setting-picklist">
    <USelectTrigger :class="ui?.trigger" :variant :size>
      {{ modelValue }}
    </USelectTrigger>

    <USelectContent>
      <USelectItem v-for="option in options" :key="option" :value="option">
        <USelectItemText> {{ option }} </USelectItemText>
      </USelectItem>
    </USelectContent>
  </USelectRoot>
</template>
