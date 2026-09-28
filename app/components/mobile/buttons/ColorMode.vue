<script lang="ts" setup>
import { mobileButtonProps } from '../Buttons.vue'
</script>

<template>
  <UButton
    :aria-label="$t('tab.themeToggle')"
    v-bind="mobileButtonProps"
    @click="toggleTheme"
    :class="cn(mobileButtonProps.class, 'absolute top-4 right-4')"
  >
    <Icon :name="$colorMode.preference === 'dark' ? ICON__CLOUD : ICON__SUN" class="size-1lh" />
  </UButton>
</template>
