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
  <div class="bg-surface h-full p-1.5 rounded border border-border flex overflow-hidden">
    <SidebarRootTabs class="shrink-0" />

    <Transition :name="tab ? '' : 'fade'">
      <SidebarRootContent v-if="tab" />
    </Transition>
  </div>
</template>
