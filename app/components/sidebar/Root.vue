<script lang="ts">
// oxlint-disable-next-line sort-keys
const iconMap = {
  multitrack: ICON__MULTITRACK,
  artist: ICON__ARTIST,
  playlist: ICON__PLAYLIST,
}

export interface SidebarRootContext {
  tab: Ref<keyof typeof iconMap | undefined>
}

export const [injectSidebarRootContext, provideSidebarRootContext] =
  createContext<SidebarRootContext>('SidebarRoot')
</script>

<script lang="ts" setup>
const tab = ref<keyof typeof iconMap | undefined>()

provideSidebarRootContext({
  tab,
})
</script>

<template>
  <div class="bg-surface h-full w-16 p-1.5 rounded border border-border">
    <UToggleGroupRoot v-model:model-value="tab" class="size-full flex flex-col gap-2">
      <UToggleGroupItem
        v-for="item in objectKeys(iconMap)"
        :key="item"
        :value="item"
        size="icon"
        class="w-full rounded-sm aspect-square h-auto"
      >
        <Icon :name="iconMap[item]" class="size-1lh" />
      </UToggleGroupItem>

      <UToggleGroupItemAnimation />
    </UToggleGroupRoot>
  </div>
</template>
