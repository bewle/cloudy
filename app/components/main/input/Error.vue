<script lang="ts" setup>
import { injectMainInputContext } from '../Input.vue'

const { error } = injectMainInputContext()

const parsedError = computed(() => {
  const parsed = parseError(error.value)
  if ('why' in parsed) return parsed
  else return { message: 'Unexpected error', why: error.value?.message }
})
</script>

<template>
  <Transition name="zoom">
    <div
      v-if="error"
      class="w-full w-main-input-w h-fit relative rounded border-danger border bg-danger/50 flex flex-col gap-1 p-4"
    >
      <h3 class="font-medium text-clip">{{ parsedError.message ?? 'Unexpected error' }}</h3>
      <p class="text-sm text-clip">{{ parsedError.why }}</p>

      <UButton
        size="icon"
        variant="ghost-danger"
        class="absolute top-2 right-2"
        @click="error = undefined"
      >
        <Icon name="ph:x" />
      </UButton>
    </div>
  </Transition>
</template>
