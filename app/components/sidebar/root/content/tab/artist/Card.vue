<script lang="ts" setup>
const props = defineProps<{ track: SCTrackSummary }>()
const src = computed(() => resolveTrackCover(props.track))
</script>

<template>
  <SidebarRootContentListCard>
    <SidebarRootContentListCardImg :src :alt="track.title" />

    <SidebarRootContentListCardContent>
      <SidebarRootContentListCardTitle :to="track.permalink_url">
        {{ track.title }}
      </SidebarRootContentListCardTitle>

      <SidebarRootContentListCardArtist>
        {{ resolveTrackArtist(track) }}
      </SidebarRootContentListCardArtist>

      <SidebarRootContentListCardDate :datetime="resolveTrackDate(track)" />
    </SidebarRootContentListCardContent>
  </SidebarRootContentListCard>
</template>
