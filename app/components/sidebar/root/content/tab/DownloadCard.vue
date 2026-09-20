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

    <div class="flex shrink-0 gap-1 h-full items-center justify-between *:rounded-sm">
      <USpinner v-if="entry.status === 'downloading'" class="size-1em" />
      <Icon
        v-else-if="entry.status === 'queued'"
        class="opacity-50 size-1em"
        :name="ICON__QUEUED"
      />
      <Icon v-else-if="entry.status === 'done'" class="text-primary size-1em" :name="ICON__CHECK" />
      <Icon
        v-else-if="entry.status === 'aborted'"
        class="text-danger size-1em"
        :name="ICON__ABORT"
      />
      <Icon v-else-if="entry.status === 'error'" class="size-1em" :name="ICON__ERROR" />
    </div>

    <UProgressUnderlay :progress :dim="progress === 1" />
  </SidebarRootContentListCard>
</template>
