<script lang="ts" setup>
const { tab } = useSidebarState()
</script>

<template>
  <UToggleGroupRoot
    v-model:model-value="tab"
    @update:model-value="console.log"
    class="flex flex-col gap-2"
  >
    <UToggleGroupItem
      v-for="item in objectKeys(sidebarTabIconMap)"
      :key="item"
      :value="item"
      size="icon"
      class="w-14 rounded-sm aspect-square h-auto"
    >
      <Icon :name="sidebarTabIconMap[item]" class="size-1lh" />
    </UToggleGroupItem>

    <UToggleGroupItemAnimation />
  </UToggleGroupRoot>
</template>
