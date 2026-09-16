<script lang="ts">
export interface SidebarTrackSourceContentContext {
  sources: Record<SidebarTrackSourceKey, TrackSource>
  activeSource: Ref<TrackSource | undefined>
}

export const [injectSidebarTrackSourceContentContext, provideSidebarTrackSourceContentContext] =
  createContext<SidebarTrackSourceContentContext>('SidebarRootContentTrackSource')
</script>

<script lang="ts" setup>
const { tab: trackSourceTab } = defineProps<{ tab: SidebarTrackSourceKey }>()

const { tab, artist, playlist, multitrackMeta } = useSidebarState()

const sources: Record<SidebarTrackSourceKey, TrackSource> = {
  artist: useArtistTracks(artist),
  multitrack: multitrackMeta,
  playlist: usePlaylistTracks(playlist),
}

const active = computed(() => sources[trackSourceTab])

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

provideSidebarTrackSourceContentContext({ activeSource: active, sources })
</script>

<template>
  <SidebarRootContentHeader />

  <div class="flex items-center gap-2">
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
</template>
