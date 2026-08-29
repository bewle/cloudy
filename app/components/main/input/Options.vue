<script lang="ts" setup>
import type { AcceptableValue } from 'reka-ui'

import { injectMainInputContext } from '../Input.vue'

const { form } = injectMainInputContext()

const inputOption = computed({
  get: () => form.value.option,
  set: (v: AcceptableValue | AcceptableValue[] | undefined) => {
    if (!v || !INPUT__OPTIONS.includes(v as InputOption)) return
    form.value.option = v as InputOption
  },
})
</script>

<template>
  <ToggleGroupRoot
    v-model:model-value="inputOption"
    :default-value="INPUT__OPTIONS[0]"
    required
    type="single"
    class="font-mono flex gap-1 items-center isolate"
  >
    <ToggleGroupItem
      v-for="o in INPUT__OPTIONS"
      :key="o"
      class="font-normal rounded-sm z-1 data-[active]:(anchor-name-option text-foreground bg-surface-active) data-[active]:active:(text-foreground bg-surface-active)"
      as-child
      :value="o"
    >
      <UButton>
        {{ o }}
      </UButton>
    </ToggleGroupItem>

    <div
      class="position-anchor-option anchor-inset rounded-sm pointer-events-none duration-100 ease-snappy absolute bg-surface-active"
    />
  </ToggleGroupRoot>
</template>
