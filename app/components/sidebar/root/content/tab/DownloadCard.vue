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
  <!-- <SidebarRootContentListCard> {{ props.entry.status }} </SidebarRootContentListCard> -->
  <SidebarRootContentListCard>
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

    <div class="flex shrink-0 h-full items-center justify-between *:rounded-sm">
      <!-- <UButton v-if="inMultitrackList" size="icon" @click="removeMultitrackItem">
        <Icon :name="ICON__TRASH" />
      </UButton> -->
      <!-- <UButton v-else size="icon" @click="addMultitrackItem">
        <Icon :name="ICON__PLUS" />
      </UButton> -->
    </div>

    <UProgressUnderlay :progress />
  </SidebarRootContentListCard>
</template>
