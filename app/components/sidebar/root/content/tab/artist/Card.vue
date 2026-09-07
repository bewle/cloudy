<script lang="ts" setup>
const props = defineProps<{ track: SCTrackSummary }>()
const src = computed(() => resolveTrackCover(props.track))
</script>

<template>
  <div class="bg-surface border rounded border-border p-3 flex gap-3">
    <Img class="size-16 rounded-sm shrink-0" :src :alt="track.title" />

    <div class="flex flex-col justify-center gap-3 *:text-clip">
      <p class="font-medium truncate py-0.5 -my-0.5">{{ track.title }}</p>
      <p class="text-sm text-muted-foreground truncate py-0.5 -my-0.5">
        {{ resolveTrackArtist(track) }}
      </p>
      <NuxtTime
        class="text-xs font-mono text-muted-foreground"
        :datetime="resolveTrackDate(track)"
      />
    </div>
  </div>
</template>
