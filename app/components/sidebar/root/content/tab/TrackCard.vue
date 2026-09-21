<script lang="ts" setup>
const props = defineProps<{ trackRow: TrackRow }>()

const parsedError = computed(() =>
  props.trackRow.status === 'error' ? parseError(props.trackRow.error) : undefined,
)
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
      </SidebarRootContentListCardContent>

      <SidebarRootContentListCardDate>
        <NuxtTime :datetime="resolveTrackDate(trackRow.track)" />
      </SidebarRootContentListCardDate>

      <SidebarRootContentListCardButtons :track-row />
    </template>

    <template v-else>
      <SidebarRootContentListCardImg
        class="border border-border border-dashed flex items-center justify-center"
      >
        <Icon :name="ICON__EMPTY" class="text-lg text-muted-foreground" />
      </SidebarRootContentListCardImg>

      <SidebarRootContentListCardContent class="flex-1">
        <SidebarRootContentListCardTitle :to="trackRow.url">
          {{ trackRow.url }}
        </SidebarRootContentListCardTitle>

        <SidebarRootContentListCardArtist
          :title="parsedError?.message ?? $t('error.track_load_failed')"
          class="text-danger truncate"
        >
          {{ parsedError?.message ?? $t('error.track_load_failed') }}
        </SidebarRootContentListCardArtist>
      </SidebarRootContentListCardContent>

      <SidebarRootContentListCardButtons :track-row />
    </template>
  </SidebarRootContentListCard>
</template>
