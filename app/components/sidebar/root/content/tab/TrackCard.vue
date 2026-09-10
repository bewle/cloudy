<script lang="ts" setup>
const props = defineProps<{ trackRow: TrackRow }>()

const parsedError = computed(() =>
  props.trackRow.status === 'error' ? parseError(props.trackRow.error) : undefined,
)

const { downloads } = useDownloads()
const downloadState = computed(() => downloads.get(props.trackRow.url))
</script>

<template>
  <SidebarRootContentTabTrackCardSkeleton v-if="trackRow.status === 'pending'" />

  <SidebarRootContentListCard v-else>
    <template v-if="trackRow.status === 'ready'">
      <SidebarRootContentListCardImg>
        <Img :src="resolveTrackCover(trackRow.track)" :alt="trackRow.track.title" />
      </SidebarRootContentListCardImg>

      <SidebarRootContentListCardContent>
        <SidebarRootContentListCardTitle :to="trackRow.track.permalink_url">
          {{ trackRow.track.title }}
        </SidebarRootContentListCardTitle>

        <SidebarRootContentListCardArtist>
          {{ resolveTrackArtist(trackRow.track) }}
        </SidebarRootContentListCardArtist>

        <SidebarRootContentListCardDate>
          <NuxtTime :datetime="resolveTrackDate(trackRow.track)" />
        </SidebarRootContentListCardDate>
      </SidebarRootContentListCardContent>

      <SidebarRootContentListCardButtons :track-row />

      <UProgressUnderlay
        v-if="downloadState?.status === 'downloading'"
        :progress="downloadState.progress"
      />
      <UProgressUnderlay v-else-if="downloadState?.status === 'done'" :progress="1" />
    </template>

    <template v-else>
      <SidebarRootContentListCardImg
        class="border border-border border-dashed flex items-center justify-center"
      >
        <Icon name="tabler:ghost-3" class="text-2xl text-muted-foreground" />
      </SidebarRootContentListCardImg>

      <SidebarRootContentListCardContent class="flex-1 shrink">
        <SidebarRootContentListCardTitle :to="trackRow.url">
          {{ trackRow.url }}
        </SidebarRootContentListCardTitle>

        <SidebarRootContentListCardArtist class="text-danger">
          {{ parsedError?.message ?? 'Failed to load track' }}
        </SidebarRootContentListCardArtist>

        <SidebarRootContentListCardDate class="text-danger">
          {{ parsedError?.why ?? 'Failed to load track' }}
        </SidebarRootContentListCardDate>
      </SidebarRootContentListCardContent>
    </template>
  </SidebarRootContentListCard>
</template>
