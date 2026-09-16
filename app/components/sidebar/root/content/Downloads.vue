<script lang="ts" setup>
const { downloads } = useDownloads()

const flatDownloads = computed(() => Array.from(downloads, ([url, entry]) => ({ ...entry, url })))
</script>

<template>
  <SidebarRootContentHeader />

  <div class="flex items-center gap-2">
    <SidebarRootContentSearch />
  </div>

  <div class="flex-1 shrink size-full overflow-auto">
    <SidebarRootContentList v-slot="{ rowVirtualizer }" :list="flatDownloads" item-key="url">
      <SidebarRootContentTabDownloadCard
        v-for="virtualRow in rowVirtualizer.getVirtualItems()"
        :key="virtualRow.index"
        class="w-full left-0 top-0 absolute"
        :style="{ transform: `translateY(${virtualRow.start}px)` }"
        :entry="flatDownloads[virtualRow.index]!"
        :url="flatDownloads[virtualRow.index]!.url"
      />

      <!-- <template v-if="!isLoadingInitial">
        <SidebarRootContentTabTrackCard
          v-for="virtualRow in rowVirtualizer.getVirtualItems()"
          :key="virtualRow.index"
          class="w-full left-0 top-0 absolute"
          :style="{ transform: `translateY(${virtualRow.start}px)` }"
          :track-row="rows[virtualRow.index]!"
        />
      </template> -->

      <!-- <template v-else>
        <SidebarRootContentTabTrackCardSkeleton v-for="i in 6" :key="i" />
      </template> -->
    </SidebarRootContentList>
  </div>
</template>
