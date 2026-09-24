<script lang="ts">
const exampleMap: Record<Exclude<ID3FrameIdWritable, 'APIC'>, string> = {
  COMM: "Radio Edits of the singles from the album 'Before The Storm'.",
  TCON: 'electronic dance music',
  TDAT: '10-26-1999',
  TIT2: 'Sandstorm (Radio Edit)',
  TPE1: 'Darude',
  WOAS: 'https://soundcloud.com/darude/sandstorm-radio-edit',
}
</script>

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  frame: Exclude<ID3FrameIdWritable, 'APIC'>
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <UToggleGroupItem
    v-slot="{ pressed }"
    :value="frame"
    :class="
      cn(
        'p-2 gap-1 h-fit w-full justify-start items-start rounded border border-border group flex-col reka-off:opacity-75 shrink',
        props.class,
      )
    "
  >
    <div class="flex items-center justify-between w-full">
      <ULabel class="text-foreground text-sm">
        {{ $t(`id3.human_readable.${frame}`) }}
      </ULabel>

      <UCheckbox
        as="span"
        tabindex="-1"
        :model-value="pressed"
        class="pointer-events-none group-hover:(bg-surface-hover border-border-hover) group-reka-active:(bg-surface-active! border-border-strong-active!)"
      />
    </div>

    <span class="text-left text-muted-foreground text-xs italic font-normal truncate w-full pr-5">
      {{ exampleMap[frame] }}
    </span>
  </UToggleGroupItem>
</template>
