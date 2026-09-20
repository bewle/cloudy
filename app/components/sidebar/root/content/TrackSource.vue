<script lang="ts">
export interface SidebarTrackSourceContentContext {
  activeSource: Ref<TrackSource | undefined>
  activeSourceKey: Ref<SidebarTrackSourceKey>
}

export const [injectSidebarTrackSourceContentContext, provideSidebarTrackSourceContentContext] =
  createContext<SidebarTrackSourceContentContext>('SidebarRootContentTrackSource')
</script>

<script lang="ts" setup>
const { tab: trackSourceTab } = defineProps<{ tab: SidebarTrackSourceKey }>()

const { artist, playlist, multitrackMeta } = useSidebarState()

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

const viewport = useTemplateRef('viewport')
const virtualizer = useListVirtualizer(
  rows,
  () => viewport.value?.viewportRef?.viewportElement ?? null,
  { estimateSize: () => 52, getItemKey: row => row.url },
)
watch([artist, playlist], () => virtualizer.value.scrollToIndex(0))

provideSidebarTrackSourceContentContext({
  activeSource: active,
  activeSourceKey: toRef(() => trackSourceTab),
})
</script>

<template>
  <SidebarRootContentHeader />

  <div class="flex items-center gap-2">
    <SidebarRootContentSearch />
    <SidebarRootContentDownloadAll />
  </div>

  <div class="flex-1 shrink size-full overflow-auto">
    <SidebarRootContentList
      ref="viewport"
      :total-size="virtualizer.getTotalSize()"
      :virtualizer
      :show-sentinel="canLoadMore"
      @sentinel="intersecting = $event"
      class="border-border rounded"
    >
      <SidebarRootContentListContainer>
        <template v-if="!isLoadingInitial">
          <SidebarRootContentTabTrackCard
            v-for="virtualRow in virtualizer.getVirtualItems()"
            :key="virtualRow.index"
            class="w-full left-0 top-0 absolute"
            :style="{ transform: `translateY(${virtualRow.start}px)` }"
            :track-row="rows[virtualRow.index]!"
          />
        </template>

        <template v-else>
          <SidebarRootContentTabTrackCardSkeleton v-for="i in 6" :key="i" />
        </template>
      </SidebarRootContentListContainer>
    </SidebarRootContentList>
  </div>
</template>
