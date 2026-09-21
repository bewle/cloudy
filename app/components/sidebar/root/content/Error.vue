<script lang="ts" setup>
const { error } = defineProps<{
  error: Error | undefined
}>()

const parsedError = useParsedError(() => error)

const icon = computed(() => {
  switch (parsedError.value?.status) {
    case 404:
      return ICON__404
    default:
      return ICON__ERROR
  }
})
</script>

<template>
  <UStateRoot>
    <UStateIcon :name="icon" />
    <UStateTitle>
      {{ parsedError?.message }}
    </UStateTitle>
    <UStateDescription v-if="parsedError?.why">
      {{ parsedError?.why }}
    </UStateDescription>
  </UStateRoot>
</template>
