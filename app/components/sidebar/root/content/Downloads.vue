<script lang="ts" setup>
const { downloads, batches } = useDownloads()

const flatBatches = computed(() => {
  const flat: FlatBatch[] = []
  let lastBatchId: string | undefined
  for (const [batchId, batch] of batches.entries()) {
    if (lastBatchId && batchId !== lastBatchId) flat.push({ id: flat.length, type: 'separator' })
    lastBatchId = batchId

    flat.push({ id: batchId, type: 'heading' })

    if (!batch.collapsed)
      batch.tracks.forEach((url, i) => {
        const key = getBatchTrackKey(batchId, url)
        const entry = downloads.get(key)!
        flat.push({ entry, key, last: i === batch.tracks.length - 1, type: 'entry', url })
      })
  }

  return flat
})

const viewport = useTemplateRef('viewport')
const ROW_HEIGHTS = { entry: 52, heading: 26, separator: 12 }
const virtualizer = useListVirtualizer(
  flatBatches,
  () => viewport.value?.viewportRef?.viewportElement ?? null,
  {
    estimateSize: row => ROW_HEIGHTS[row.type],
    getItemKey: row => (row.type === 'entry' ? row.key : row.id),
  },
)
const virtualRows = computed(() =>
  virtualizer.value.getVirtualItems().map(v => ({ row: flatBatches.value[v.index]!, v })),
)

const hasBatches = computed(() => batches.size > 1)
</script>

<template>
  <SidebarRootContentHeader />

  <div class="flex gap-2 items-center">
    <SidebarRootContentSearch />
  </div>

  <div
    class="flex-1 shrink size-full overflow-auto"
    :class="!hasBatches ? 'flex items-center justify-center h-full' : ''"
  >
    <SidebarRootContentList
      v-if="hasBatches"
      ref="viewport"
      :total-size="virtualizer.getTotalSize()"
      :virtualizer
    >
      <div
        v-for="{ row, v } in virtualRows"
        :key="v.index"
        class="w-full left-0 top-0 absolute"
        :class="row.type === 'entry' && row.last ? 'of-clip rounded-b' : ''"
        :style="{ transform: `translateY(${v.start}px)` }"
      >
        <SidebarRootContentTabDownloadHeader
          v-if="row.type === 'heading'"
          :batch="batches.get(row.id)!"
        />

        <SidebarRootContentTabDownloadCard
          v-else-if="row.type === 'entry'"
          class="border-x border-b border-border"
          :class="row.last && 'rounded-b'"
          :entry="row.entry"
          :url="row.url"
        />

        <div v-else-if="row.type === 'separator'" class="h-12px" aria-hidden="true" />
      </div>
    </SidebarRootContentList>

    <UStateRoot v-else class="max-w-96">
      <UStateIcon :name="ICON__EMPTY" />
      <UStateTitle>
        {{ $t('sidebar.no_selection.title.downloads') }}
      </UStateTitle>
      <UStateDescription>
        {{ $t('sidebar.no_selection.description.downloads') }}
      </UStateDescription>
    </UStateRoot>
  </div>
</template>
