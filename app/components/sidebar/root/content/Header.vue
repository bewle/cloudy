<script lang="ts" setup>
const { tab } = useSidebarState()
const previousTab = ref<SidebarTab>(tab.value ?? 'multitrack')

whenever(tab, newTab => (previousTab.value = newTab))
</script>

<template>
  <header class="pe-2 ps-4 flex h-14 w-full items-center justify-between">
    <h3 class="text-xl font-medium">
      {{ sidebarTabNameMap[previousTab] }}
    </h3>

    <UButton size="icon" aria-label="Close sidebar" @click="tab = undefined">
      <Icon :name="ICON__SIDEBAR_CLOSE" />
    </UButton>
  </header>
</template>
