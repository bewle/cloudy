<script lang="ts" setup>
const { downloads, batches } = useDownloads()

const flatBatches = computed(() => {
  const flat: FlatBatch[] = []
  let lastBatchId: string | undefined
  for (const [batchId, batch] of batches.entries()) {
    if (lastBatchId && batchId !== lastBatchId) flat.push({ id: flat.length, type: 'separator' })
    lastBatchId = batchId

    flat.push({
      id: batchId,
      name: batch.name,
      source: batch.source,
      type: 'heading',
    })

    batch.tracks.forEach((url, i) => {
      const key = getBatchTrackKey(batchId, url)
      const entry = downloads.get(key)!
      flat.push({ entry, key, last: i === batch.tracks.length - 1, type: 'entry', url })
    })
  }

  return flat
})

const viewport = useTemplateRef('viewport')
const virtualizer = useDownloadsVirtualizer(
  flatBatches,
  () => viewport.value?.viewportRef?.viewportElement ?? null,
)
const virtualRows = computed(() =>
  virtualizer.value.getVirtualItems().map(v => ({ row: flatBatches.value[v.index]!, v })),
)
</script>

<template>
  <SidebarRootContentHeader />

  <div class="flex items-center gap-2">
    <SidebarRootContentSearch />
  </div>

  <div class="flex-1 shrink size-full overflow-auto">
    <SidebarRootContentList :virtualizer ref="viewport">
      <div
        v-for="{ row, v } in virtualRows"
        :key="v.index"
        class="w-full left-0 top-0 absolute"
        :class="row.type === 'entry' && row.last ? 'of-clip rounded-b' : ''"
        :style="{ transform: `translateY(${v.start}px)` }"
      >
        <SidebarRootContentListHeader
          v-if="row.type === 'heading'"
          class="border border-border rounded-t text-sm gap-1 text-xs"
        >
          <Icon :name="SIDEBAR__BUTTON_META[row.source].icon" />
          <span class="font-medium">{{ row.name }}</span>
        </SidebarRootContentListHeader>

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
  </div>
</template>
