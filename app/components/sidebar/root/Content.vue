<script lang="ts">
import { SidebarRootContentTabArtist, SidebarRootContentTabPlaylist } from '#components'
const tabComponentMap = {
  artist: SidebarRootContentTabArtist,
  multitrack: SidebarRootContentTabArtist,
  playlist: SidebarRootContentTabPlaylist,
}
</script>

<script lang="ts" setup>
const layout = useIndexSplitterState()
const { tab } = useSidebarState()
</script>

<template>
  <div
    class="pe-2 ps-4 flex flex-col gap-2 h-full"
    :style="{
      'min-width': `${(layout[0] ?? GENERAL__INDEX_DEFAULT_SIZE) - GENERAL__INDEX_RAIL}px`,
    }"
  >
    <SidebarRootContentHeader />
    <SidebarRootContentSearch />

    <div class="flex-1 shrink size-full overflow-auto">
      <component :is="tab && tabComponentMap[tab]" />
    </div>
  </div>
</template>
