<script lang="ts" setup>
const { tab } = useSidebarState()
</script>

<template>
  <UStateRoot>
    <UStateIcon :name="ICON__EMPTY" />
    <UStateTitle> {{ $t(`sidebar.no_selection.title.${tab}`) }} </UStateTitle>
    <UStateDescription>
      {{ $t(`sidebar.no_selection.description.${tab}`) }}
    </UStateDescription>
  </UStateRoot>
</template>
