<script lang="ts" setup>
import { injectMainInputContext } from '../Input.vue'

const { error } = injectMainInputContext()

const parsedError = computed(() => parseError(error.value))
</script>

<template>
  <div class="w-full rounded border-danger h-full border bg-danger/50 flex flex-col p-4">
    <h3>{{ parsedError.code ?? 'Unexpected error' }}</h3>
    <p>{{ parsedError.message }}</p>
  </div>
</template>
