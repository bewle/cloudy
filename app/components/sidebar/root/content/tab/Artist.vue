<script lang="ts" setup>
const { artist } = useSidebarState()
const { data } = useArtistTracks(artist)

const collection = computed(() => data.value?.collection.filter(isTrackSummary) ?? [])
</script>

<template>
  <SidebarRootContentList v-slot="{ rowVirtualizer }" :list="collection" item-key="id">
    <SidebarRootContentTabArtistCard
      v-for="row in rowVirtualizer.getVirtualItems()"
      :key="row.index"
      class="w-full left-0 top-0 absolute"
      :style="{ transform: `translateY(${row.start}px)` }"
      :track="collection[row.index]!"
    />
  </SidebarRootContentList>
</template>
