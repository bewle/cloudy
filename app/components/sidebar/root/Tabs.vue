<script lang="ts" setup>
import { UToggleGroupItem } from '#components'

const { tab, previousTab: previousTabRef } = useSidebarState()

const buttonProps = {
  class: 'rounded-sm h-auto w-14 aspect-square',
  size: 'icon',
} as const

const shouldAnimate = computed(() => {
  const currentTab = tab.value
  if (!currentTab) return true

  const previousTab = previousTabRef.value
  return (
    currentTab !== previousTab &&
    SIDEBAR__BUTTON_META[currentTab].section === SIDEBAR__BUTTON_META[previousTab].section
  )
})

const getPreviousTab = (key: SidebarButtonKey) => {
  const i = SIDEBAR__BUTTON_KEYS.findIndex(k => k === key)
  return SIDEBAR__BUTTON_KEYS[Math.max(0, i - 1)]!
}
</script>

<template>
  <UToggleGroupRoot v-model:model-value="tab" class="flex flex-col gap-2">
    <template v-for="item in SIDEBAR__BUTTON_KEYS" :key="item">
      <div
        v-if="
          SIDEBAR__BUTTON_META[getPreviousTab(item)].section !== SIDEBAR__BUTTON_META[item].section
        "
        class="flex-1 shrink"
      />

      <UToggleGroupItem
        v-if="SIDEBAR__BUTTON_META[item].isTab"
        :value="item"
        :aria-label="$t(`tab.${item}`)"
        v-bind="buttonProps"
      >
        <Icon :name="SIDEBAR__BUTTON_META[item].icon" class="size-1lh" />
      </UToggleGroupItem>

      <UButton
        v-else-if="item === 'themeToggle'"
        :aria-label="$t(`tab.${item}`)"
        v-bind="buttonProps"
        @click="toggleTheme"
      >
        <Icon :name="$colorMode.preference === 'dark' ? ICON__CLOUD : ICON__SUN" class="size-1lh" />
      </UButton>

      <UButton v-else :aria-label="$t(`tab.${item}`)" v-bind="buttonProps">
        <Icon :name="SIDEBAR__BUTTON_META[item].icon" class="size-1lh" />
      </UButton>
    </template>

    <UToggleGroupItemAnimation :class="!shouldAnimate && 'invisible transition-none'" />
  </UToggleGroupRoot>
</template>
