<script lang="ts" setup>
const { artist } = useSidebarState()
const { tracks, loadNextHref, canLoadMore, isLoading } = useArtistTracks(artist)

const collection = computed(() => tracks.value?.filter(isTrackSummary) ?? [])

const intersecting = ref(false)

watch([intersecting, isLoading], ([hit, loading]) => {
  if (hit && !loading && canLoadMore.value) loadNextHref()
})
</script>

<template>
  <SidebarRootContentList
    :show-sentinel="canLoadMore"
    :list="collection"
    item-key="id"
    v-slot="{ rowVirtualizer }"
    @sentinel="intersecting = $event"
  >
    <SidebarRootContentTabArtistCard
      v-for="row in rowVirtualizer.getVirtualItems()"
      :key="row.index"
      class="w-full left-0 top-0 absolute"
      :style="{ transform: `translateY(${row.start}px)` }"
      :track="collection[row.index]!"
    />
  </SidebarRootContentList>
</template>
