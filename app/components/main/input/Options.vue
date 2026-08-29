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
    class="flex items-center font-mono gap-1 isolate"
  >
    <ToggleGroupItem
      v-for="o in INPUT__OPTIONS"
      class="font-normal rounded-sm data-[active]:active:(text-foreground bg-surface-active) data-[active]:(anchor-name-option text-foreground bg-surface-active) z-1"
      :key="o"
      as-child
      :value="o"
    >
      <UButton>
        {{ o }}
      </UButton>
    </ToggleGroupItem>

    <div
      class="absolute pointer-events-none position-anchor-option anchor-inset bg-surface-active rounded-sm ease-snappy duration-100"
    />
  </ToggleGroupRoot>
</template>
