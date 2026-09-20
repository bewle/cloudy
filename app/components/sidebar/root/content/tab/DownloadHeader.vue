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
    class="border border-border p-0 rounded-t gap-0 text-xs relative"
    :class="batch.collapsed && 'rounded-b'"
    :style="{
      '--progress-color':
        batch.status === 'aborted' || batch.status === 'error' ? 'var(--danger)' : 'var(--primary)',
    }"
  >
    <div
      @click.self="toggleCollapseBatch(batch.id)"
      class="py-1 px-2 hover:(bg-surface-raised) of-clip border-r border-border flex items-center gap-1 flex-1"
    >
      <Icon :name="SIDEBAR__BUTTON_META[batch.source].icon" />
      <span>{{ batch.name }}</span>

      <div class="flex-1" />

      <USpinner v-if="batch.status === 'downloading'" class="size-1em scale-75" />
      <Icon v-else-if="batch.status === 'done'" :name="ICON__CHECK" class="size-1em text-primary" />

      <div
        class="h-px absolute -bottom-px -ml-2 of-clip"
        :class="cn(batch.status === 'done' && 'opacity-50', batch.collapsed && 'px-1.25')"
        :style="{
          width: `${batchProgress * 100}%`,
        }"
      >
        <div class="size-full bg-[var(--progress-color)]" />
      </div>
    </div>

    <div class="flex items-center gap-2 px-1">
      <UButton
        @click="deleteBatch(batch.id)"
        size="sm"
        class="size-4 rounded-sm p-0 text-muted-foreground hover:text-foreground"
      >
        <Icon :name="ICON__TRASH" class="h-1em" />
      </UButton>

      <UButton
        :disabled="batch.status !== 'downloading'"
        @click="abortBatch(batch.id)"
        size="sm"
        class="size-4 rounded-sm p-0 text-muted-foreground hover:text-foreground"
      >
        <Icon :name="ICON__ABORT" class="h-1em" />
      </UButton>
    </div>
  </SidebarRootContentListHeader>
</template>
