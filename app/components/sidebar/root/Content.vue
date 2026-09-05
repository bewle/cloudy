<script lang="ts" setup>
const layout = useIndexSplitterState()
</script>

<template>
  <div
    class="h-full"
    :style="{
      'min-width': `${(layout[0] ?? GENERAL__INDEX_DEFAULT_SIZE) - GENERAL__INDEX_RAIL}px`,
    }"
  >
    <SidebarRootContentHeader />
  </div>
</template>
