<script lang="ts" setup>
const { shownTab } = useSidebarState()
</script>

<template>
  <UStateRoot>
    <UStateIcon :name="ICON__EMPTY" />
    <UStateTitle> {{ $t(`sidebar.no_selection.title.${shownTab}`) }} </UStateTitle>
    <UStateDescription>
      {{ $t(`sidebar.no_selection.description.${shownTab}`) }}
    </UStateDescription>
  </UStateRoot>
</template>
