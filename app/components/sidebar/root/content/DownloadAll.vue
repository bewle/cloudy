<script lang="ts" setup>
import { injectSidebarTrackSourceContentContext } from './TrackSource.vue'

const { tab, playlistMeta, artistMeta, searchQuery } = useSidebarState()

const { rows, activeSourceKey } = injectSidebarTrackSourceContentContext()
const hasTracks = computed(() => rows.value.some(i => i.status === 'ready'))
const query = computed(() => searchQuery.value.trim())

const { downloadBatch } = useDownloads()

const handleClick = () => {
  if (!hasTracks.value) return
  const tracks = rows.value

  const sourceName =
    (tab.value === 'playlist'
      ? playlistMeta.data.value?.title
      : tab.value === 'artist'
        ? artistMeta.data.value?.username
        : undefined) ?? new Date().toISOString()
  const batchName = query.value ? `${sourceName} ("${query.value}")` : sourceName

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
    :aria-label="$t(query ? 'action.download_matching' : 'action.download_all')"
    :title="$t(query ? 'action.download_matching' : 'action.download_all')"
    @click="handleClick"
  >
    <Icon :name="ICON__DOWNLOAD" />
  </UButton>
</template>
