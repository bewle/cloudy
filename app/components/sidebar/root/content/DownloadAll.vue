<script lang="ts" setup>
import { injectSidebarTrackSourceContentContext } from './TrackSource.vue'

const { tab, playlistMeta, artistMeta } = useSidebarState()

const { activeSource, activeSourceKey } = injectSidebarTrackSourceContentContext()
const hasTracks = computed(
  () => activeSource.value?.items.value.some(i => i.status === 'ready') ?? false,
)

const { downloadBatch } = useDownloads()

const handleClick = () => {
  if (!hasTracks.value) return
  const tracks = activeSource.value?.items.value ?? []

  const batchName =
    (tab.value === 'playlist'
      ? playlistMeta.data.value?.title
      : tab.value === 'artist'
        ? artistMeta.data.value?.username
        : undefined) ?? new Date().toISOString()

  downloadBatch(
    tracks.filter(t => t.status === 'ready').map(t => ({ meta: t.track, url: t.url })),
    batchName,
    activeSourceKey.value,
  )
  tab.value = 'downloads'
}
</script>

<template>
  <UButton
    :disabled="!hasTracks"
    variant="outline"
    class="shrink-0"
    size="icon"
    @click="handleClick"
  >
    <Icon :name="ICON__DOWNLOAD" />
  </UButton>
</template>
