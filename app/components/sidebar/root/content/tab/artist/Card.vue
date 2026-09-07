<script lang="ts" setup>
const props = defineProps<{ track: SCTrackSummary }>()
const src = computed(() => resolveTrackCover(props.track))
</script>

<template>
  <div class="p-3 border border-border rounded bg-surface flex gap-3">
    <Img class="rounded-sm shrink-0 size-16" :src :alt="track.title" />

    <div class="flex flex-col justify-center gap-3 *:text-clip">
      <NuxtLink
        :to="track.permalink_url"
        external
        class="hover:underline underline-offset-px font-medium truncate py-0.5 -my-0.5"
        target="_blank"
      >
        {{ track.title }}
      </NuxtLink>
      <p class="text-sm text-muted-foreground truncate py-0.5 -my-0.5">
        {{ resolveTrackArtist(track) }}
      </p>
      <NuxtTime
        class="text-xs text-muted-foreground font-mono"
        :datetime="resolveTrackDate(track)"
      />
    </div>
  </div>
</template>
