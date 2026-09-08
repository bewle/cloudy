<script lang="ts" setup>
const { playlist } = useSidebarState()
const { tracks, loadNextHref, canLoadMore, isLoading } = usePlaylistTracks(playlist)
</script>

<template>
  <SidebarRootContentTabTrackList
    :tracks="tracks"
    :can-load-more="canLoadMore"
    :is-loading="isLoading"
    @load-more="loadNextHref"
  />
</template>
