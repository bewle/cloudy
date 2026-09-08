<script lang="ts" setup>
import type { ImgProps } from '~/components/Img.vue'

const props = defineProps<ImgProps>()

const delegated = reactiveOmit(props, 'class')
</script>

<template>
  <Img v-bind="delegated" :class="cn('rounded-sm shrink-0 size-16', props.class)" />
</template>
