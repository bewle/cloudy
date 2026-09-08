<script lang="ts" setup>
const { artist } = useSidebarState()
const { tracks, loadNextHref, canLoadMore, isLoading } = useArtistTracks(artist)
</script>

<template>
  <SidebarRootContentTabTrackList
    :tracks="tracks"
    :can-load-more="canLoadMore"
    :is-loading="isLoading"
    @load-more="loadNextHref"
  />
</template>
