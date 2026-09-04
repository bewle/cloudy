<script lang="ts" setup>
import { injectMainInputContext } from '../Input.vue'

const { form, submitForm, isDownloading } = injectMainInputContext()

const placeholder = useState('main-input-field-placeholder', () =>
  sample(INPUT__FIELD_PLACEHOLDERS),
)
</script>

<template>
  <div class="flex gap-2 items-center">
    <input
      v-model="form.url"
      class="text-sm ps-1.5 outline-none h-main-input-field-h w-full"
      :placeholder
      @keydown.enter="submitForm"
    >

    <UButton
      :disabled="!form.url.trim()"
      :is-loading="isDownloading"
      size="icon"
      @click="submitForm"
    >
      <Icon name="ph:arrow-right-bold" />
    </UButton>
  </div>
</template>
