<script lang="ts" setup>
import { injectMainInputContext } from '../Input.vue'

const { form, submitForm, isDownloading } = injectMainInputContext()
</script>

<template>
  <div class="flex items-center gap-2">
    <input
      v-model="form.url"
      @keydown.enter="submitForm"
      class="h-main-input-field-h ps-2 font-medium text-sm w-full outline-none"
      placeholder="https://soundcloud.com/pilarsierra/dewey-a2a"
    />

    <UButton :is-loading="isDownloading" @click="submitForm" size="icon">
      <Icon name="ph:arrow-right-bold" />
    </UButton>
  </div>
</template>
