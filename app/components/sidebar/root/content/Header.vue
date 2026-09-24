<script lang="ts" setup>
const { t } = useI18n()
const { batches } = useDownloads()
const {
  tab,
  multitrackList,
  artistMeta,
  artist: artistUrl,
  playlist: playlistUrl,
  playlistMeta,
  previousTab,
} = useSidebarState()
const { data: artistMetaData, pending: pendingArtist } = artistMeta
const { data: playlistMetaData, pending: pendingPlaylist } = playlistMeta

const subheading = computed(() => {
  if (tab.value === 'artist')
    return (
      artistMetaData.value?.full_name ||
      artistMetaData.value?.username ||
      artistUrl.value ||
      t('sidebar.no_selection.title.artist')
    )
  if (tab.value === 'playlist')
    return (
      playlistMetaData.value?.title ?? playlistUrl.value ?? t('sidebar.no_selection.title.playlist')
    )

  if (tab.value === 'downloads') return t('sidebar.batch_count', [batches.size], batches.size)
  if (tab.value === 'multitrack')
    return t('sidebar.track_count', [multitrackList.size], multitrackList.size)

  return null
})
</script>

<template>
  <header class="flex shrink-0 gap-2 h-14 w-full items-center justify-between">
    <div class="flex shrink flex-col w-full justify-center">
      <h3 class="text-xl font-semibold w-fit">
        {{ $t(`tab.${tab ?? previousTab}`) }}
      </h3>

      <USkeleton v-if="pendingArtist || pendingPlaylist" class="text-xs h-1lh w-24" />
      <p
        v-else-if="subheading"
        :title="subheading"
        class="text-xs text-muted-foreground font-mono truncate"
      >
        {{ subheading }}
      </p>
    </div>

    <UButton size="icon" :aria-label="$t('action.close_sidebar')" @click="tab = undefined">
      <Icon :name="ICON__SIDEBAR_CLOSE" />
    </UButton>
  </header>
</template>
