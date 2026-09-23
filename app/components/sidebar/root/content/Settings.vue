<script lang="ts" setup>
const settingsEntries = computed(() => {
  const metadata = { ...SETTINGS__METADATA }
  return objectKeys(metadata).map(k =>
    Object.assign(metadata[k], {
      default: SETTINGS__DEFAULT[k] as any,
      key: k,
    }),
  )
})
</script>

<template>
  <SidebarRootContentHeader />
  <div class="flex flex-col gap-4 max-w-128">
    <template v-for="entry in settingsEntries" :key="entry.key">
      <SidebarRootContentSettingsFrames v-if="entry.key === 'metadataFrames'" />
      <SidebarRootContentSettingsFormat v-else-if="entry.key === 'preferredFormat'" />

      <!-- <USettingRoot v-else>
        <USettingLabel>{{ $t(`settings.${entry.key}.title`) }}</USettingLabel>
        <USettingPicklist
          v-if="entry.type === 'picklist'"
          :options="entry.options"
          :default-value="entry.default"
        />
      </USettingRoot> -->
    </template>
  </div>
</template>
