<script lang="ts" setup>
const { t } = useI18n()
const sidebarState = useSidebarState()

const placeholder = computed(() => {
  if (sidebarState.tab.value === 'artist') {
    if (!sidebarState.artist.value) return t('sidebar.no_selection.title.artist')
    if (sidebarState.artistMeta.pending.value) return t('state.loading')

    const { track_count } = sidebarState.artistMeta.data.value ?? {}
    return typeof track_count === 'number'
      ? t('search.placeholder_count', [track_count], track_count)
      : t('search.placeholder')
  }

  if (sidebarState.tab.value === 'playlist') {
    if (!sidebarState.playlist.value) return t('sidebar.no_selection.title.playlist')
    if (sidebarState.playlistMeta.pending.value) return t('state.loading')

    const { track_count } = sidebarState.playlistMeta.data.value ?? {}
    return typeof track_count === 'number'
      ? t('search.placeholder_count', [track_count], track_count)
      : t('search.placeholder')
  }

  const { size } = sidebarState.multitrackList
  return t('search.placeholder_count', [size], size)
})

const disabled = computed(() => {
  if (sidebarState.tab.value === 'multitrack') return false
  if (sidebarState.tab.value === 'artist' && sidebarState.artist.value) return false
  if (sidebarState.tab.value === 'playlist' && sidebarState.playlist.value) return false

  return true
})
</script>

<template>
  <UInput class="flex-1" :placeholder :disabled />
</template>
