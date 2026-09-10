<script lang="ts">
export interface SidebarRootContentContext {
  sources: Record<SidebarTab, TrackSource>
}

export const [injectSidebarRootContentContext, provideSidebarRootContentContext] =
  createContext<SidebarRootContentContext>('SidebarRootContent')
</script>

<script lang="ts" setup>
const layout = useIndexSplitterState()
const { tab, artist, playlist, multitrackMeta } = useSidebarState()

const sources: Record<SidebarTab, TrackSource> = {
  artist: useArtistTracks(artist),
  multitrack: multitrackMeta,
  playlist: usePlaylistTracks(playlist),
}
provideSidebarRootContentContext({ sources })

const active = computed(() => (tab.value ? sources[tab.value] : undefined))

const rows = computed(() => active.value?.items.value ?? [])

const canLoadMore = computed(() => active.value?.canLoadMore.value ?? false)
const isLoading = computed(() => active.value?.isLoading.value ?? false)
const isLoadingInitial = computed(() => isLoading.value && rows.value.length === 0)

const intersecting = ref(false)
watch([intersecting, isLoading], ([hit, loading]) => {
  if (hit && !loading && canLoadMore.value) active.value?.loadNextHref()
})

const virtualizer = useTemplateRef('list')
watch([artist, playlist], () => virtualizer.value?.rowVirtualizer.scrollToIndex(0))
</script>

<template>
  <div
    class="pe-2 ps-4 flex flex-col gap-2 h-full"
    :style="{
      'min-width': `${(layout[0] ?? GENERAL__INDEX_DEFAULT_SIZE) - GENERAL__INDEX_RAIL}px`,
    }"
  >
    <SidebarRootContentHeader />
    <div class="flex gap-2 items-center">
      <SidebarRootContentSearch />
      <SidebarRootContentDownloadAll />
    </div>

    <div class="flex-1 shrink size-full overflow-auto">
      <SidebarRootContentList
        v-if="tab"
        ref="list"
        v-slot="{ rowVirtualizer }"
        :show-sentinel="canLoadMore"
        :list="rows"
        item-key="url"
        @sentinel="intersecting = $event"
      >
        <template v-if="!isLoadingInitial">
          <SidebarRootContentTabTrackCard
            v-for="virtualRow in rowVirtualizer.getVirtualItems()"
            :key="virtualRow.index"
            class="w-full left-0 top-0 absolute"
            :style="{ transform: `translateY(${virtualRow.start}px)` }"
            :track-row="rows[virtualRow.index]!"
          />
        </template>

        <template v-else>
          <SidebarRootContentTabTrackCardSkeleton v-for="i in 6" :key="i" />
        </template>
      </SidebarRootContentList>
    </div>
  </div>
</template>
