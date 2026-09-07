<script lang="ts">
import { SidebarRootContentTabArtist } from '#components'
const tabComponentMap = {
  artist: SidebarRootContentTabArtist,
  multitrack: SidebarRootContentTabArtist,
  playlist: SidebarRootContentTabArtist,
}
</script>

<script lang="ts" setup>
const layout = useIndexSplitterState()
const { tab } = useSidebarState()
</script>

<template>
  <div
    class="h-full pe-2 ps-4 flex flex-col gap-2"
    :style="{
      'min-width': `${(layout[0] ?? GENERAL__INDEX_DEFAULT_SIZE) - GENERAL__INDEX_RAIL}px`,
    }"
  >
    <SidebarRootContentHeader />
    <SidebarRootContentSearch />

    <div class="size-full flex-1 shrink overflow-auto">
      <component :is="tab && tabComponentMap[tab]" />
    </div>
  </div>
</template>
