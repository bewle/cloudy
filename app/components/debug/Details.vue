<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core'

const fps = useFps({
  every: 32,
})

const { active } = useBreakpoints(breakpointsTailwind)
const breakpoint = active()
</script>

<template>
  <div class="text-xs absolute top-2 right-2 text-muted-foreground font-mono z-100000">
    {{ fps }}
    <span>{{ breakpoint }}</span>
  </div>
</template>
