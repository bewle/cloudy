<script lang="ts" setup>
const settings = useSettings()
</script>

<template>
  <USettingRoot>
    <USettingLabel>{{ $t('settings.metadataFrames.title') }}</USettingLabel>

    <UToggleGroupRoot
      v-model="settings.metadataFrames"
      class="flex gap-2 items-start"
      type="multiple"
    >
      <UToggleGroupItem
        v-slot="{ pressed }"
        value="APIC"
        class="group p-2.5 border border-border rounded size-36 items-start justify-between reka-off:opacity-75"
      >
        <ULabel class="text-foreground">
          {{ $t(`id3.human_readable.APIC`) }}
        </ULabel>

        <UCheckbox
          as="span"
          tabindex="-1"
          :model-value="pressed"
          class="text-sm size-1lh pointer-events-none group-hover:(bg-surface-hover border-border-hover) group-reka-active:(bg-surface-active! border-border-strong-active!)"
        />
      </UToggleGroupItem>

      <div class="flex flex-col gap-2 w-full">
        <SidebarRootContentSettingsFramesField frame="TIT2" />
        <div class="flex gap-2 items-center">
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
