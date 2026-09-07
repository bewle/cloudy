<script lang="ts" setup>
const props = defineProps<{ track: SCTrackSummary }>()
const src = computed(() => resolveTrackCover(props.track))
</script>

<template>
  <div class="p-3 border border-border rounded bg-surface flex gap-3">
    <Img class="rounded-sm shrink-0 size-16" :src :alt="track.title" />

    <div class="flex flex-col gap-3 justify-center *:text-clip">
      <p class="font-medium py-0.5 truncate -my-0.5">
        {{ track.title }}
      </p>
      <p class="text-sm text-muted-foreground py-0.5 truncate -my-0.5">
        {{ resolveTrackArtist(track) }}
      </p>
      <NuxtTime
        class="text-xs text-muted-foreground font-mono"
        :datetime="resolveTrackDate(track)"
      />
    </div>
  </div>
</template>
