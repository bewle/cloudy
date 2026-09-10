<script lang="ts" setup>
const props = defineProps<{
  trackRow: TrackRow
}>()

const { downloadSingle, isBatchRunning, downloads } = useDownloads()

const { multitrackList } = useSidebarState()
const inMultitrackList = computed(() => multitrackList.has(props.trackRow.url))
const isDownloading = computed(() => downloads.get(props.trackRow.url)?.status === 'downloading')

const addMultitrackItem = () => multitrackList.add(props.trackRow.url)
const removeMultitrackItem = () => multitrackList.delete(props.trackRow.url)

const download = async () => {
  if (props.trackRow.status !== 'ready') return
  await downloadSingle(props.trackRow.url, {
    meta: props.trackRow.status === 'ready' ? props.trackRow.track : undefined,
    save: true,
  })

  downloads.delete(props.trackRow.url)
}
</script>

<template>
  <div class="ml-auto flex shrink-0 flex-col items-end self-end justify-between *:rounded-sm">
    <UButton
      :disabled="isDownloading || isBatchRunning || trackRow.status !== 'ready'"
      size="icon"
      @click="download"
    >
      <Icon :name="ICON__DOWNLOAD" />
    </UButton>

    <UButton
      v-if="inMultitrackList"
      :disabled="isBatchRunning"
      size="icon"
      @click="removeMultitrackItem"
    >
      <Icon :name="ICON__TRASH" />
    </UButton>
    <UButton v-else size="icon" :disabled="isBatchRunning" @click="addMultitrackItem">
      <Icon :name="ICON__PLUS" />
    </UButton>
  </div>
</template>
