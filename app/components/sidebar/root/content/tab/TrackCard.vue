<script lang="ts" setup>
const props = defineProps<{ row: TrackRow }>()

const parsedError = computed(() =>
  props.row.status === 'error' ? parseError(props.row.error) : undefined,
)
</script>

<template>
  <SidebarRootContentListCard :class="row.status === 'pending' && 'p-0 border-none'">
    <template v-if="row.status === 'ready'">
      <SidebarRootContentListCardImg>
        <Img :src="resolveTrackCover(row.track)" :alt="row.track.title" />
      </SidebarRootContentListCardImg>

      <SidebarRootContentListCardContent>
        <SidebarRootContentListCardTitle :to="row.track.permalink_url">
          {{ row.track.title }}
        </SidebarRootContentListCardTitle>

        <SidebarRootContentListCardArtist>
          {{ resolveTrackArtist(row.track) }}
        </SidebarRootContentListCardArtist>

        <SidebarRootContentListCardDate>
          <NuxtTime :datetime="resolveTrackDate(row.track)" />
        </SidebarRootContentListCardDate>
      </SidebarRootContentListCardContent>
    </template>

    <template v-else-if="row.status === 'error'">
      <SidebarRootContentListCardImg
        class="border border-border border-dashed flex items-center justify-center"
      >
        <Icon name="tabler:ghost-3" class="text-2xl text-muted-foreground" />
      </SidebarRootContentListCardImg>

      <SidebarRootContentListCardContent class="flex-1 shrink">
        <SidebarRootContentListCardTitle :to="row.url">
          {{ row.url }}
        </SidebarRootContentListCardTitle>

        <SidebarRootContentListCardArtist class="text-danger">
          {{ parsedError?.message ?? 'Failed to load track' }}
        </SidebarRootContentListCardArtist>

        <SidebarRootContentListCardDate class="text-danger">
          {{ parsedError?.why ?? 'Failed to load track' }}
        </SidebarRootContentListCardDate>
      </SidebarRootContentListCardContent>
    </template>

    <USkeleton v-else class="rounded size-full" />
  </SidebarRootContentListCard>
</template>
