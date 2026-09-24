<script lang="ts" setup>
const settings = useSettings()
</script>

<template>
  <USettingRoot>
    <div class="flex gap-2 items-center">
      <UCheckbox id="fallback-enabled" v-model="settings.fallbackFormat.enabled" />

      <i18n-t
        keypath="settings.fallbackFormat.description"
        tag="label"
        for="fallback-enabled"
        scope="global"
      >
        <template #format>
          <USettingPicklist
            v-model:model-value="settings.fallbackFormat.format as any"
            variant="link"
            :options="SETTINGS__METADATA.fallbackFormat.options"
            :disabled="!settings.fallbackFormat.enabled"
            :ui="{
              trigger: 'text-base',
            }"
          />
        </template>
      </i18n-t>
    </div>
  </USettingRoot>
</template>
