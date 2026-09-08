<script lang="ts" setup>
const { tab, multitrackList, artist, playlist } = useSidebarState()
const previousTab = ref<SidebarTab>(tab.value ?? 'multitrack')

whenever(tab, newTab => (previousTab.value = newTab))

const { data: artistMeta, pending: pendingArtist } = useArtistMeta(artist)
const { data: playlistMeta, pending: pendingPlaylist } = usePlaylistMeta(playlist)

const subheading = computed(() => {
  if (tab.value === 'artist') {
    return (
      artistMeta.value?.full_name ||
      artistMeta.value?.username ||
      artist.value ||
      'No artist selected'
    )
  }
  if (tab.value === 'playlist') {
    return playlistMeta.value?.title ?? playlist.value ?? 'No playlist selected'
  }
  return `${multitrackList.size} tracks`
})
</script>

<template>
  <header class="flex shrink-0 gap-2 h-14 w-full items-center justify-between">
    <div class="flex shrink flex-col w-full justify-center">
      <h3 class="text-xl font-medium w-fit">
        {{ sidebarTabNameMap[previousTab] }}
      </h3>

      <USkeleton v-if="pendingArtist || pendingPlaylist" class="text-xs h-1lh w-24" />
      <p v-else :title="subheading" class="text-xs text-muted-foreground font-mono truncate">
        {{ subheading }}
      </p>
    </div>

    <UButton size="icon" aria-label="Close sidebar" @click="tab = undefined">
      <Icon :name="ICON__SIDEBAR_CLOSE" />
    </UButton>
  </header>
</template>
