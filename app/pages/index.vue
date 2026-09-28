<script lang="ts" setup>
import type { SplitterPanel } from 'reka-ui'

const layout = useIndexSplitterState()
const { tab, animating, isSidebarPanel } = useSidebarState()
const sidebar = useTemplateRef<InstanceType<typeof SplitterPanel>>('sidebar')
const mounted = useMounted()

watch(tab, t => {
  if (t) sidebar.value?.resize(layout.value?.[0] ?? GENERAL__INDEX_DEFAULT_SIZE)
})
</script>

<template>
  <div class="flex h-screen items-center">
    <MobileButtons />

    <SplitterGroup
      id="index-splitter"
      direction="horizontal"
      @layout="tab && isSidebarPanel && (layout = $event)"
    >
      <SplitterPanel
        id="index-splitter-panel-1"
        ref="sidebar"
        as="aside"
        size-unit="px"
        class="h-full flex lt-sidebar:(absolute inset-0 z-1)"
        :class="[
          animating && 'motion-safe:(transition-[flex-grow] duration-150 ease-snappy)',
          !tab && 'lt-sidebar:(pointer-events-none)',
        ]"
        :min-size="tab ? GENERAL__INDEX_MIN_SIZE : GENERAL__INDEX_RAIL"
        :max-size="tab ? GENERAL__INDEX_MAX_SIZE : GENERAL__INDEX_RAIL"
        :default-size="tab ? (layout?.[0] ?? GENERAL__INDEX_DEFAULT_SIZE) : GENERAL__INDEX_RAIL"
        :style="mounted ? undefined : { flexGrow: 0, flexBasis: `${GENERAL__INDEX_RAIL}px` }"
      >
        <div class="h-full sidebar:p-2">
          <SidebarRoot />
        </div>
      </SplitterPanel>

      <SplitterResizeHandle v-if="tab && isSidebarPanel" class="my-2.5 -translate-x-2.5 z-2" />

      <SplitterPanel
        id="index-splitter-panel-2"
        as="main"
        class="flex items-center justify-center sidebar:(pr-2) lt-sidebar:(p-2)"
        :class="animating && 'motion-safe:(transition-[flex-grow] duration-150 ease-snappy)'"
      >
        <MainInput />
      </SplitterPanel>
    </SplitterGroup>
  </div>
</template>
