<script lang="ts" setup>
const { tab } = useSidebarState()
</script>

<template>
  <UToggleGroupRoot
    v-model:model-value="tab"
    class="flex flex-col gap-2"
    @update:model-value="console.log"
  >
    <UToggleGroupItem
      v-for="item in objectKeys(sidebarTabIconMap)"
      :key="item"
      :value="item"
      size="icon"
      class="rounded-sm h-auto w-14 aspect-square"
    >
      <Icon :name="sidebarTabIconMap[item]" class="size-1lh" />
    </UToggleGroupItem>

    <UToggleGroupItemAnimation />
  </UToggleGroupRoot>
</template>
