<script lang="ts" setup>
import { injectMainInputContext } from '../Input.vue'

const { form, submitForm, isDownloading } = injectMainInputContext()

const placeholder = useState('main-input-field-placeholder', () =>
  sample(INPUT__FIELD_PLACEHOLDERS),
)

const handleRight = (e: Event) => {
  if (form.value.url) return

  e.preventDefault()
  form.value.url = placeholder.value
}
</script>

<template>
  <div class="flex gap-2 items-center">
    <input
      v-model="form.url"
      class="text-sm ps-1.5 outline-none h-main-input-field-h w-full"
      :placeholder
      @keydown.enter="submitForm"
      @keydown.right="handleRight"
    />

    <UButton
      :disabled="!form.url.trim()"
      :is-loading="isDownloading"
      size="icon"
      @click="submitForm"
    >
      <Icon :name="ICON__RIGHT_ARROW" />
    </UButton>
  </div>
</template>
