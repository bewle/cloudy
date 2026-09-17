<script lang="ts" setup>
const props = defineProps<{ entry: DownloadEntry; url: string }>()
const { getTrackMeta } = useTrackMeta()
const trackMeta = computed(() => {
  const meta = getTrackMeta(props.url)
  assert(meta, `No track meta found for ${props.url}`)
  return meta
})

const progress = computed(() =>
  props.entry.status === 'downloading'
    ? props.entry.progress
    : props.entry.status === 'done'
      ? 1
      : 0,
)
</script>

<template>
  <SidebarRootContentListCard class="of-clip">
    <SidebarRootContentListCardImg>
      <Img :src="resolveTrackCover(trackMeta)" :alt="trackMeta.title" />
    </SidebarRootContentListCardImg>

    <SidebarRootContentListCardContent>
      <SidebarRootContentListCardTitle :to="trackMeta.permalink_url">
        {{ trackMeta.title }}
      </SidebarRootContentListCardTitle>

      <SidebarRootContentListCardArtist>
        {{ resolveTrackArtist(trackMeta) }}
      </SidebarRootContentListCardArtist>
    </SidebarRootContentListCardContent>

    <SidebarRootContentListCardDate>
      <NuxtTime :datetime="resolveTrackDate(trackMeta)" />
    </SidebarRootContentListCardDate>

    <UProgressUnderlay :progress :dim="progress === 1" />
  </SidebarRootContentListCard>
</template>
