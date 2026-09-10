<script lang="ts" setup>
import { injectSidebarRootContentContext } from '../Content.vue'

const { sources } = injectSidebarRootContentContext()

const { tab } = useSidebarState()
const { downloadBatch, isBatchRunning } = useDownloads()

const handleDownloadAll = () => {
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
  <UButton class="shrink-0" size="icon" :is-loading="isBatchRunning" @click="handleDownloadAll">
    <Icon :name="ICON__DOWNLOAD" />
  </UButton>
</template>
