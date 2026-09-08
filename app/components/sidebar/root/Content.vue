<script lang="ts" setup>
const layout = useIndexSplitterState()
const { tab, artist, playlist } = useSidebarState()

const artistSource = useArtistTracks(artist)
const playlistSource = usePlaylistTracks(playlist)

const sourceMap = {
  artist: artistSource,
  multitrack: artistSource,
  playlist: playlistSource,
} satisfies Record<SidebarTab, unknown>

const active = computed(() => (tab.value ? sourceMap[tab.value] : undefined))
const tracks = computed(() => active.value?.tracks.value?.filter(isTrackSummary) ?? [])
const canLoadMore = computed(() => active.value?.canLoadMore.value ?? false)
const isLoading = computed(() => active.value?.isLoading.value ?? false)

const intersecting = ref(false)
watch([intersecting, isLoading], ([hit, loading]) => {
  if (hit && !loading && canLoadMore.value) active.value?.loadNextHref()
})
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
      <SidebarRootContentList
        v-if="tab"
        v-slot="{ rowVirtualizer }"
        :show-sentinel="canLoadMore"
        :list="tracks"
        item-key="id"
        @sentinel="intersecting = $event"
      >
        <SidebarRootContentTabTrackCard
          v-for="row in rowVirtualizer.getVirtualItems()"
          :key="row.index"
          class="w-full left-0 top-0 absolute"
          :style="{ transform: `translateY(${row.start}px)` }"
          :track="tracks[row.index]!"
        />
      </SidebarRootContentList>
    </div>
  </div>
</template>
