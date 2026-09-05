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
  <header class="h-14 flex items-center ps-4 pe-2 w-full justify-between">
    <h3 class="font-medium text-xl">{{ tabNameMap[previousTab] }}</h3>

    <UButton @click="tab = undefined" size="icon">
      <Icon :name="ICON__SIDEBAR_CLOSE" />
    </UButton>
  </header>
</template>
