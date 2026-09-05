<script lang="ts">
const tabNameMap: Record<SidebarTab, string> = {
  artist: 'Artist',
  multitrack: 'Multi-track',
  playlist: 'Playlist',
}
</script>

<script lang="ts" setup>
let previousTab: SidebarTab = 'multitrack'
const { tab } = useSidebarState()

whenever(tab, newTab => (previousTab = newTab))
</script>

<template>
  <header class="pe-2 ps-4 flex h-14 w-full items-center justify-between">
    <h3 class="text-xl font-medium">
      {{ tabNameMap[previousTab] }}
    </h3>

    <UButton size="icon" aria-label="Close sidebar" @click="tab = undefined">
      <Icon :name="ICON__SIDEBAR_CLOSE" />
    </UButton>
  </header>
</template>
