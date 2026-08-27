<script lang="ts" setup>
import type { AcceptableValue } from 'reka-ui'

const { inputOption: inputOptionValue } = useInputForm()

const inputOption = computed({
  get: () => inputOptionValue.value,
  set: (v: AcceptableValue | AcceptableValue[] | undefined) => {
    if (!v || !INPUT__OPTIONS.includes(v as InputOption)) return
    inputOptionValue.value = v as InputOption
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
