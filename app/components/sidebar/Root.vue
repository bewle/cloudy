<script lang="ts">
export interface SidebarRootContext {}

export const [injectSidebarRootContext, provideSidebarRootContext] =
  createContext<SidebarRootContext>('SidebarRoot')
</script>

<script lang="ts" setup>
const { tab } = useSidebarState()

provideSidebarRootContext({})
</script>

<template>
  <div class="p-1.5 border border-border rounded bg-surface flex h-full overflow-hidden">
    <SidebarRootTabs class="shrink-0" />

    <Transition :name="tab ? '' : 'fade'">
      <SidebarRootContent v-if="tab" />
    </Transition>
  </div>
</template>
