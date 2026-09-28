<script lang="ts">
import { toRef } from '@vueuse/core'

export interface SidebarTrackSourceContentContext {
  rows: Ref<TrackRow[]>
  activeSourceKey: Ref<SidebarTrackSourceKey>
}

export const [injectSidebarTrackSourceContentContext, provideSidebarTrackSourceContentContext] =
  createContext<SidebarTrackSourceContentContext>('SidebarRootContentTrackSource')
</script>

<script lang="ts" setup>
const { tab: trackSourceTab } = defineProps<{ tab: SidebarTrackSourceKey }>()

const { artist, playlist, multitrackMeta, searchQuery } = useSidebarState()

const sources: Record<SidebarTrackSourceKey, TrackSource> = {
  artist: useArtistTracks(artist),
  multitrack: multitrackMeta,
  playlist: usePlaylistTracks(playlist),
}

const active = computed(() => sources[trackSourceTab])

const items = computed(() => active.value?.items.value ?? [])
const rows = computed(() =>
  items.value.filter(row =>
    matchesQuery(row.status === 'ready' ? row.track : undefined, row.url, searchQuery.value),
  ),
)

const canLoadMore = computed(() => active.value?.canLoadMore.value ?? false)
const isLoading = computed(() => active.value?.isLoading.value ?? false)
const isLoadingInitial = computed(() => isLoading.value && items.value.length === 0)

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
watch([artist, playlist, () => trackSourceTab, searchQuery], () =>
  virtualizer.value.scrollToIndex(0),
)

provideSidebarTrackSourceContentContext({
  activeSourceKey: toRef(() => trackSourceTab),
  rows,
})

const activeHasNoInput = computed(
  () =>
    !active.value.isLoading.value && !active.value.items.value.length && !active.value.error.value,
)
const error = computed(() => active.value.error.value)
const noMatches = computed(
  () => !rows.value.length && !!items.value.length && !isLoading.value && !canLoadMore.value,
)
</script>

<template>
  <SidebarRootContentHeader />

  <div class="flex gap-2 items-center">
    <SidebarRootContentSearch />
    <SidebarRootContentDownloadAll />
  </div>

  <div
    class="flex-1 shrink size-full overflow-auto"
    :class="error || activeHasNoInput || noMatches ? 'flex items-center justify-center h-full' : ''"
  >
    <SidebarRootContentList
      v-if="!error && !activeHasNoInput && !noMatches"
      ref="viewport"
      :total-size="virtualizer.getTotalSize()"
      :virtualizer
      :show-sentinel="canLoadMore"
      class="border-border rounded"
      @sentinel="intersecting = $event"
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

    <SidebarRootContentNoInput v-else-if="activeHasNoInput" />

    <SidebarRootContentNoMatches v-else-if="noMatches" />

    <SidebarRootContentError v-else :error />
  </div>
</template>
