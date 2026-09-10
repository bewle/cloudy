<script lang="ts" setup>
import { injectSidebarRootContentContext } from '../Content.vue'

const { sources } = injectSidebarRootContentContext()

const { tab } = useSidebarState()
const { downloadBatch, isBatchRunning } = useDownloads()

const hasValidTracks = computed(() => {
  if (tab.value !== 'multitrack') return false
  if (!sources.multitrack.items.value.length) return false

  return sources.multitrack.items.value.some(row => row.status === 'ready')
})

const handleDownloadAll = () => {
  if (hasValidTracks.value) return

  if (!tab.value || !['artist', 'playlist', 'multitrack'].includes(tab.value)) return

  const rows = sources[tab.value].items.value

  return downloadBatch(
    rows.map(row => ({
      meta: row.status === 'ready' ? row.track : undefined,
      url: row.url,
    })),
  )
}
</script>

<template>
  <UButton
    :disabled="!hasValidTracks"
    class="shrink-0"
    size="icon"
    :is-loading="isBatchRunning"
    @click="handleDownloadAll"
  >
    <Icon :name="ICON__DOWNLOAD" />
  </UButton>
</template>
