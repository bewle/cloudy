<script lang="ts" setup>
const settings = useSettings()
</script>

<template>
  <USettingRoot>
    <USettingLabel>{{ $t('settings.metadataFrames.title') }}</USettingLabel>

    <UToggleGroupRoot
      class="flex items-start gap-2"
      type="multiple"
      v-model="settings.metadataFrames"
    >
      <UToggleGroupItem
        value="APIC"
        class="size-36 group reka-off:opacity-75 rounded border border-border items-start justify-between p-2.5"
        v-slot="{ pressed }"
      >
        <ULabel class="text-foreground">
          {{ $t(`id3.human_readable.APIC`) }}
        </ULabel>

        <UCheckbox
          as="span"
          tabindex="-1"
          :model-value="pressed"
          class="pointer-events-none text-sm size-1lh group-hover:(bg-surface-hover border-border-hover) group-reka-active:(bg-surface-active! border-border-strong-active!)"
        />
      </UToggleGroupItem>

      <div class="w-full flex flex-col gap-2">
        <SidebarRootContentSettingsFramesField frame="TIT2" />
        <div class="flex items-center gap-2">
          <SidebarRootContentSettingsFramesField frame="TPE1" />
          <SidebarRootContentSettingsFramesField frame="TDAT" />
        </div>
        <SidebarRootContentSettingsFramesField frame="TCON" />
        <SidebarRootContentSettingsFramesField frame="COMM" />
        <SidebarRootContentSettingsFramesField frame="WOAS" />
      </div>
    </UToggleGroupRoot>
  </USettingRoot>
</template>
