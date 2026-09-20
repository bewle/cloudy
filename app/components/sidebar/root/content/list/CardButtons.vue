<script lang="ts" setup>
const props = defineProps<{
  trackRow: TrackRow
}>()

const { multitrackList } = useSidebarState()
const inMultitrackList = computed(() => multitrackList.has(props.trackRow.url))

const addMultitrackItem = () => multitrackList.add(props.trackRow.url)
const removeMultitrackItem = () => multitrackList.delete(props.trackRow.url)
</script>

<template>
  <div class="ml-auto flex shrink-0 flex-col items-end self-end justify-between *:rounded-sm">
    <UButton v-if="inMultitrackList" size="icon" @click="removeMultitrackItem">
      <Icon :name="ICON__TRASH" />
    </UButton>
    <UButton v-else size="icon" @click="addMultitrackItem">
      <Icon :name="ICON__PLUS" />
    </UButton>
  </div>
</template>
