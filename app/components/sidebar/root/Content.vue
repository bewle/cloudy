<script lang="ts" setup>
const layout = useIndexSplitterState()
const { tab, shownTab } = useSidebarState()
</script>

<template>
  <div
    class="pe-2 ps-4 flex flex-col gap-2 h-full min-w-(--content-w) lt-sidebar:(min-w-[calc(100%-3rem)]) sidebar:(transition-opacity duration-150 ease-snappy)"
    :class="!tab && 'sidebar:opacity-0'"
    :style="{
      '--content-w': `${(layout[0] ?? GENERAL__INDEX_DEFAULT_SIZE) - GENERAL__INDEX_RAIL}px`,
    }"
    :inert="!tab"
  >
    <SidebarRootContentTrackSource
      v-if="shownTab === 'multitrack' || shownTab === 'artist' || shownTab === 'playlist'"
      :tab="shownTab"
    />

    <SidebarRootContentDownloads v-else-if="shownTab === 'downloads'" />
    <SidebarRootContentSettings v-else-if="shownTab === 'settings'" />
  </div>
</template>
