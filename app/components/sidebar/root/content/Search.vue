<script lang="ts" setup>
const sidebarState = useSidebarState()

const placeholder = computed(() => {
  if (sidebarState.tab.value === 'artist') {
    if (!sidebarState.artist.value) return 'No artist selected'
    if (sidebarState.artistMeta.pending.value) return '...'

    const { track_count } = sidebarState.artistMeta.data.value ?? {}
    return `Search ${track_count} tracks`
  }

  if (sidebarState.tab.value === 'playlist') {
    if (!sidebarState.playlist.value) return 'No playlist selected'
    if (sidebarState.playlistMeta.pending.value) return '...'

    const { track_count } = sidebarState.playlistMeta.data.value ?? {}
    return `Search ${track_count} tracks`
  }

  return `Search ${sidebarState.multitrackList.size} tracks`
})

const disabled = computed(() => {
  if (sidebarState.tab.value === 'multitrack') return false
  if (sidebarState.tab.value === 'artist' && sidebarState.artist.value) return false
  if (sidebarState.tab.value === 'playlist' && sidebarState.playlist.value) return false

  return true
})
</script>

<template>
  <UInput :placeholder :disabled />
</template>
