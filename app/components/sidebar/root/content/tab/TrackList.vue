<script lang="ts" setup>
const props = defineProps<{
  tracks: SCTrackSummary[]
  canLoadMore: boolean
  isLoading: boolean
}>()

const emit = defineEmits<{ loadMore: [] }>()

const collection = computed(() => props.tracks.filter(isTrackSummary))

const intersecting = ref(false)

watch([intersecting, () => props.isLoading], ([hit, loading]) => {
  if (hit && !loading && props.canLoadMore) emit('loadMore')
})
</script>

<template>
  <SidebarRootContentList
    v-slot="{ rowVirtualizer }"
    :show-sentinel="canLoadMore"
    :list="collection"
    item-key="id"
    @sentinel="intersecting = $event"
  >
    <SidebarRootContentTabTrackCard
      v-for="row in rowVirtualizer.getVirtualItems()"
      :key="row.index"
      class="w-full left-0 top-0 absolute"
      :style="{ transform: `translateY(${row.start}px)` }"
      :track="collection[row.index]!"
    />
  </SidebarRootContentList>
</template>
