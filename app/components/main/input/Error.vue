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
      class="p-4 border border-danger rounded bg-danger/50 flex flex-col gap-1 h-fit w-full w-main-input-w relative"
    >
      <h3 class="font-medium text-clip">
        {{ parsedError.message ?? 'Unexpected error' }}
      </h3>
      <p class="text-sm text-clip">
        {{ parsedError.why }}
      </p>

      <UButton
        size="icon"
        variant="ghost-danger"
        class="right-2 top-2 absolute"
        @click="error = undefined"
      >
        <Icon :name="ICON__CLOSE" />
      </UButton>
    </div>
  </Transition>
</template>
