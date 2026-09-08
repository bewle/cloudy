<script lang="ts" setup>
import type { NuxtTimeProps } from 'nuxt/app'
import type { HTMLAttributes } from 'vue'

interface Props extends NuxtTimeProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const delegated = reactiveOmit(props, 'class')
</script>

<template>
  <NuxtTime
    v-bind="delegated"
    :class="cn('text-xs text-muted-foreground font-mono', props.class)"
  />
</template>
