<script lang="ts" setup>
const { t } = useI18n()
const { batches } = useDownloads()
const { tab, multitrackList, artist, playlist, previousTab } = useSidebarState()
const { data: artistMeta, pending: pendingArtist } = useArtistMeta(artist)
const { data: playlistMeta, pending: pendingPlaylist } = usePlaylistMeta(playlist)

const subheading = computed(() => {
  if (tab.value === 'artist')
    return (
      artistMeta.value?.full_name ||
      artistMeta.value?.username ||
      artist.value ||
      t('sidebar.no_artist_selected')
    )
  if (tab.value === 'playlist')
    return playlistMeta.value?.title ?? playlist.value ?? t('sidebar.no_playlist_selected')

  if (tab.value === 'downloads') return t('sidebar.batch_count', [batches.size], batches.size)

  return t('sidebar.track_count', [multitrackList.size], multitrackList.size)
})
</script>

<template>
  <header class="flex shrink-0 gap-2 h-14 w-full items-center justify-between">
    <div class="flex shrink flex-col w-full justify-center">
      <h3 class="text-xl font-medium w-fit">
        {{ $t(`tab.${tab ?? previousTab}`) }}
      </h3>

      <USkeleton v-if="pendingArtist || pendingPlaylist" class="text-xs h-1lh w-24" />
      <p v-else :title="subheading" class="text-xs text-muted-foreground font-mono truncate">
        {{ subheading }}
      </p>
    </div>

    <UButton size="icon" :aria-label="$t('action.close_sidebar')" @click="tab = undefined">
      <Icon :name="ICON__SIDEBAR_CLOSE" />
    </UButton>
  </header>
</template>
