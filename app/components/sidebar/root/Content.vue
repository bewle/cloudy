<script lang="ts" setup>
const layout = useIndexSplitterState()
const { tab } = useSidebarState()
</script>

<template>
  <Transition :name="tab ? '' : 'fade'">
    <div
      v-if="tab"
      class="pe-2 ps-4 flex flex-col gap-2 h-full"
      :style="{
        'min-width': `${(layout[0] ?? GENERAL__INDEX_DEFAULT_SIZE) - GENERAL__INDEX_RAIL}px`,
      }"
    >
      <SidebarRootContentTrackSource
        v-if="tab === 'multitrack' || tab === 'artist' || tab === 'playlist'"
        :tab
      />

      <SidebarRootContentDownloads v-else-if="tab === 'downloads'" />
      <SidebarRootContentSettings v-else-if="tab === 'settings'" />
    </div>
  </Transition>
</template>
