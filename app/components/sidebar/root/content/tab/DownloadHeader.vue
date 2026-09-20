<script lang="ts" setup>
const props = defineProps<{ batch: DownloadBatch }>()

const { downloads, toggleCollapseBatch, abortBatch, deleteBatch } = useDownloads()
const batchDownloads = computed(() =>
  props.batch.tracks.map(url => downloads.get(getBatchTrackKey(props.batch.id, url))!),
)

const batchProgress = computed(
  () =>
    batchDownloads.value.reduce(
      (sum, dl) => sum + (dl.status === 'downloading' ? dl.progress : dl.status === 'done' ? 1 : 0),
      0,
    ) / batchDownloads.value.length,
)
</script>

<template>
  <SidebarRootContentListHeader
    class="text-xs p-0 border border-border rounded-t gap-0 relative"
    :class="batch.collapsed && 'rounded-b'"
    :style="{
      '--progress-color':
        batch.status === 'aborted' || batch.status === 'error' ? 'var(--danger)' : 'var(--primary)',
    }"
  >
    <div
      class="px-2 py-1 border-r border-border flex flex-1 gap-1 items-center of-clip hover:(bg-surface-raised)"
      @click="toggleCollapseBatch(batch.id)"
    >
      <Icon :name="SIDEBAR__BUTTON_META[batch.source].icon" />
      <span>{{ batch.name }}</span>

      <div class="flex-1" />

      <USpinner v-if="batch.status === 'downloading'" class="size-1em scale-75" />
      <Icon v-else-if="batch.status === 'done'" :name="ICON__CHECK" class="text-primary size-1em" />

      <div
        class="h-px absolute of-clip -ml-2 -bottom-px"
        :class="cn(batch.status === 'done' && 'opacity-50', batch.collapsed && 'px-1.25')"
        :style="{
          width: `${batchProgress * 100}%`,
        }"
      >
        <div class="bg-[var(--progress-color)] size-full" />
      </div>
    </div>

    <div class="px-1 flex gap-2 items-center">
      <UButton
        size="sm"
        class="text-muted-foreground p-0 rounded-sm size-4 hover:text-foreground"
        @click="deleteBatch(batch.id)"
      >
        <Icon :name="ICON__TRASH" class="h-1em" />
      </UButton>

      <UButton
        :disabled="batch.status !== 'downloading'"
        size="sm"
        class="text-muted-foreground p-0 rounded-sm size-4 hover:text-foreground"
        @click="abortBatch(batch.id)"
      >
        <Icon :name="ICON__ABORT" class="h-1em" />
      </UButton>
    </div>
  </SidebarRootContentListHeader>
</template>
