<script lang="ts" setup>
import type { AcceptableValue } from 'reka-ui'

import { injectMainInputContext } from '../Input.vue'

const { form, autoDetect, submitForm } = injectMainInputContext()

const inputOption = computed({
  get: () => form.value.option,
  set: (v: AcceptableValue | AcceptableValue[] | undefined) => {
    if (!v || !INPUT__OPTIONS.includes(v as InputOption)) return
    form.value.option = v as InputOption
  },
})

const { isSupported: canPaste } = useClipboard()

const handlePaste = async (data: string | File | Event) => {
  if (data instanceof File) return

  let text: string | undefined
  if (data instanceof Event) {
    if (!canPaste.value) return
    text = await navigator.clipboard.readText()
  } else text = data

  if (!text) return

  form.value.url = text
  submitForm()
}

onPaste(handlePaste)
</script>

<template>
  <div class="flex gap-1 items-center">
    <UToggleGroupRoot
      v-model:model-value="inputOption"
      :default-value="INPUT__OPTIONS[0]"
      required
      type="single"
      class="font-mono flex flex-1 gap-1 items-center isolate"
    >
      <UToggleGroupItem
        v-for="o in without(INPUT__OPTIONS, 'multitrack')"
        :key="o"
        class="font-normal rounded-sm"
        :value="o"
      >
        {{ $t(`input.option.${o}`) }}
      </UToggleGroupItem>

      <div class="flex-1" />

      <UToggleGroupItem class="font-normal rounded-sm" value="multitrack">
        <Icon :name="ICON__MULTITRACK" />
      </UToggleGroupItem>

      <UToggleGroupItemAnimation v-if="inputOption !== 'multitrack'" />
    </UToggleGroupRoot>

    <UToggle
      v-model:model-value="autoDetect"
      size="icon"
      class="rounded-sm shrink-0"
      :aria-label="$t('action.auto_detect')"
    >
      <Icon :name="ICON__AUTO_DETECT" />
    </UToggle>

    <ClientOnly>
      <UButton :disabled="!canPaste" size="icon" class="rounded-sm shrink-0" @click="handlePaste">
        <Icon :name="ICON__PASTE" />
      </UButton>

      <template #fallback>
        <UButton size="icon" class="rounded-sm shrink-0">
          <Icon :name="ICON__PASTE" />
        </UButton>
      </template>
    </ClientOnly>
  </div>
</template>
