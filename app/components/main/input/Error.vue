<script lang="ts" setup>
import { injectMainInputContext } from '../Input.vue'

const { error } = injectMainInputContext()

const parsedError = computed(() => parseError(error.value))
</script>

<template>
  <div class="p-4 border border-danger rounded bg-danger/50 flex flex-col h-full w-full">
    <h3>{{ parsedError.code ?? 'Unexpected error' }}</h3>
    <p>{{ parsedError.message }}</p>
  </div>
</template>
