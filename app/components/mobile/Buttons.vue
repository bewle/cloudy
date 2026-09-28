<script lang="ts">
import { sidebarTabButtonProps } from '../sidebar/root/Tabs.vue'

export const mobileButtonProps = {
  ...sidebarTabButtonProps,
  variant: 'soft',
} as const
</script>

<script lang="ts" setup>
void 0
</script>

<template>
  <div class="sidebar:hidden">
    <MobileButtonsSidebar />
    <MobileButtonsColorMode />
  </div>
</template>
