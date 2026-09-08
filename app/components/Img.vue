<script lang="ts" setup>
import { useForwardPropsEmits } from 'reka-ui'
import type { HTMLAttributes, ImgHTMLAttributes } from 'vue'

export interface ImgProps {
  src: string | undefined
  alt: string | undefined
  fallbackAlt?: string
  width?: number
  height?: number
  size?: number
  class?: HTMLAttributes['class']
  loading?: ImgHTMLAttributes['loading']
  doPlaceholder?: boolean
}

export interface ImgEmits {
  error: [err: string | Event]
  load: [event: Event]
  url: [url: string | undefined]
}

const props = defineProps<ImgProps>()
const emits = defineEmits<ImgEmits>()

const error = shallowRef(false)
const loaded = shallowRef(false)

watch(
  () => props.src,
  url => {
    emits('url', url)
    error.value = false
    loaded.value = false
  },
  { immediate: true },
)

function handleCached(e: any) {
  const el = e.el as HTMLImageElement
  if (!(el instanceof HTMLImageElement)) return

  if (el.complete && el.naturalWidth > 0) loaded.value = true
}

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <NuxtImg
    v-bind="forwarded"
    :loading="loading ?? 'lazy'"
    :alt="alt ?? fallbackAlt ?? 'Unknown image'"
    :width="size ?? width ?? 400"
    :height="size ?? height ?? 400"
    :src
    :class="cn('select-none relative', props.class)"
    :data-loaded="loaded ? 'true' : 'false'"
    :data-error="error ? 'true' : 'false'"
    @load="
      (e: Event) => {
        loaded = true
        onLoad?.(e)
      }
    "
    @error="
      e => {
        error = true
        onError?.(e)
      }
    "
    @vue:mounted="handleCached"
  />
</template>
