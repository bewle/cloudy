<script lang="ts" setup>
const { tab, animating, isSidebarPanel } = useSidebarState()
</script>

<template>
  <FocusScope as-child :trapped="!!tab && !isSidebarPanel">
    <div
      class="p-1.5 border border-border rounded bg-surface flex h-full overflow-hidden lt-sidebar:(absolute inset-2 h-auto -translate-x-[calc(100%+1rem)])"
      :class="[
        tab && 'lt-sidebar:translate-x-0',
        animating && 'lt-sidebar:(transition-transform ease-snappy duration-150)',
      ]"
      :inert="!tab && !isSidebarPanel"
      data-slot="sidebar-root"
    >
      <SidebarRootTabs class="shrink-0" />
      <SidebarRootContent />
    </div>
  </FocusScope>
</template>
