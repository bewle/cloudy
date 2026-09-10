<script lang="ts" setup>
const props = defineProps<{
  trackRow: TrackRow
}>()

const { isBatchRunning } = useDownloads()

const { multitrackList } = useSidebarState()
const inMultitrackList = computed(() => multitrackList.has(props.trackRow.url))

const addMultitrackItem = () => multitrackList.add(props.trackRow.url)
const removeMultitrackItem = () => multitrackList.delete(props.trackRow.url)
</script>

<template>
  <div class="flex flex-1 flex-col items-end justify-between *:rounded-sm">
    <UButton :disabled="isBatchRunning" size="icon" @click="removeMultitrackItem">
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
