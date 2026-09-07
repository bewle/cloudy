<script lang="ts" setup>
import { useVirtualizer } from '@tanstack/vue-virtual'

const { artist } = useSidebarState()
const { data } = useArtistTracks(artist)
const collection = computed(() => data.value?.collection.filter(isTrackSummary) ?? [])

const viewport = useTemplateRef('viewport')
const rowVirtualizer = useVirtualizer(
  computed(() => ({
    count: collection.value.length,
    estimateSize: () => 90,
    gap: 8,
    getItemKey: index => collection.value[index]!.id,
    getScrollElement: () => viewport.value?.viewportElement ?? null,
    overscan: 5,
  })),
)
</script>

<template>
  <UScrollAreaRoot>
    <UScrollAreaViewport ref="viewport" class="pe-3.5">
      <!-- <SidebarRootContentTabArtistCard v-for="track in collection" :key="track.id" :track /> -->
      <!-- <SidebarRootContentTabArtistCard
        v-for="track in rowVirtualizer.getVirtualItems()"
        :key="track.index"
        :track="collection[track.index]!"
      /> -->
      <div class="relative w-full" :style="{ height: `${rowVirtualizer.getTotalSize()}px` }">
        <SidebarRootContentTabArtistCard
          v-for="row in rowVirtualizer.getVirtualItems()"
          :key="row.index"
          class="absolute top-0 left-0 w-full"
          :style="{ transform: `translateY(${row.start}px)` }"
          :track="collection[row.index]!"
        />
      </div>
    </UScrollAreaViewport>

    <UScrollAreaScrollbars :horizontal="false" />
  </UScrollAreaRoot>
</template>
