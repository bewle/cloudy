<script lang="ts"></script>

<script lang="ts" setup>
import type { SplitterPanel } from 'reka-ui'

const layout = useIndexSplitterState()
const { tab } = useSidebarState()
const sidebar = useTemplateRef<InstanceType<typeof SplitterPanel>>('sidebar')
const mounted = useMounted()

const animating = refAutoReset(false, 150)

watch(tab, t => {
  animating.value = true
  if (t) sidebar.value?.resize(layout.value?.[0] ?? GENERAL__INDEX_DEFAULT_SIZE)
})
</script>

<template>
  <div class="flex h-screen items-center">
    <SplitterGroup id="index-splitter" direction="horizontal" @layout="tab && (layout = $event)">
      <SplitterPanel
        id="index-splitter-panel-1"
        ref="sidebar"
        as="aside"
        size-unit="px"
        class="h-full"
        :class="animating && 'motion-safe:(transition-[flex-grow] duration-150 ease-snappy)'"
        :min-size="tab ? GENERAL__INDEX_MIN_SIZE : GENERAL__INDEX_RAIL"
        :max-size="tab ? GENERAL__INDEX_MAX_SIZE : GENERAL__INDEX_RAIL"
        :default-size="tab ? (layout?.[0] ?? GENERAL__INDEX_DEFAULT_SIZE) : GENERAL__INDEX_RAIL"
        :style="mounted ? undefined : { flexGrow: 0, flexBasis: `${GENERAL__INDEX_RAIL}px` }"
      >
        <div class="p-2 h-full">
          <SidebarRoot />
        </div>
      </SplitterPanel>

      <SplitterResizeHandle v-if="tab" class="my-2.5 -translate-x-2.5" />

      <SplitterPanel id="index-splitter-panel-2" as="main" class="flex items-center justify-center">
        <MainInput />
      </SplitterPanel>
    </SplitterGroup>
  </div>
</template>
