<script lang="ts" setup>
import { injectSidebarTrackSourceContentContext } from './TrackSource.vue'

const { tab } = useSidebarState()

const { activeSource } = injectSidebarTrackSourceContentContext()
const hasTracks = computed(() => {
  const items = activeSource.value?.items.value ?? []

  if (!items.length) return false
  return items.some(i => i.status === 'ready')
})

const { downloadBatch } = useDownloads()

const handleClick = () => {
  if (!hasTracks.value) return
  const tracks = activeSource.value?.items.value ?? []

  downloadBatch(tracks.filter(t => t.status === 'ready').map(t => ({ meta: t.track, url: t.url })))
  tab.value = 'downloads'
}
</script>

<template>
  <UButton
    :disabled="!hasTracks"
    @click="handleClick"
    variant="outline"
    class="shrink-0"
    size="icon"
  >
    <Icon :name="ICON__DOWNLOAD" />
  </UButton>
</template>
