<script lang="ts" setup>
import { injectMainInputContext } from '../Input.vue'

const { form, submitForm, isDownloading } = injectMainInputContext()
</script>

<template>
  <div class="flex gap-2 items-center">
    <input
      v-model="form.url"
      class="text-sm ps-2 outline-none h-main-input-field-h w-full"
      placeholder="https://soundcloud.com/pilarsierra/dewey-a2a"
      @keydown.enter="submitForm"
    >

    <UButton :is-loading="isDownloading" size="icon" @click="submitForm">
      <Icon name="ph:arrow-right-bold" />
    </UButton>
  </div>
</template>
