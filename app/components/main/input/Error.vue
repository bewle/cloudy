<script lang="ts" setup>
import { injectMainInputContext } from '../Input.vue'

const { downloadState } = injectMainInputContext()
const error = computed(() =>
  downloadState.value?.status === 'error' ? downloadState.value.error : undefined,
)

const parsedError = useParsedError(error)
</script>

<template>
  <Transition name="zoom">
    <div
      v-if="parsedError"
      class="p-4 border border-danger rounded bg-danger/50 flex flex-col gap-1 h-fit w-full w-main-input-w relative"
    >
      <h3 class="font-medium">
        {{ parsedError.message ?? $t('error.unexpected') }}
      </h3>
      <p class="text-sm">
        {{ parsedError.fix ?? parsedError.why }}
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
