<script lang="ts" setup>
import { mobileButtonProps } from '../Buttons.vue'

const { previousTab, tab } = useSidebarState()
</script>

<template>
  <UButton
    :aria-label="$t('action.open_sidebar')"
    v-bind="mobileButtonProps"
    :class="cn(mobileButtonProps.class, 'absolute top-4 left-4')"
    @click="tab = previousTab"
  >
    <Icon :name="ICON__SIDEBAR_OPEN" class="size-1lh" />
  </UButton>
</template>
