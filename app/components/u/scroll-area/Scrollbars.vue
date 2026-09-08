<script lang="ts" setup>
withDefaults(defineProps<{ horizontal?: boolean; vertical?: boolean }>(), {
  horizontal: true,
  vertical: true,
})
</script>

<template>
  <UScrollAreaScrollbar
    :style="{
      opacity: vertical ? 1 : 0,
    }"
    orientation="vertical"
  >
    <UScrollAreaThumb />
  </UScrollAreaScrollbar>

  <UScrollAreaScrollbar
    :style="{
      opacity: horizontal ? 1 : 0,
    }"
    orientation="horizontal"
  >
    <UScrollAreaThumb />
  </UScrollAreaScrollbar>
</template>
