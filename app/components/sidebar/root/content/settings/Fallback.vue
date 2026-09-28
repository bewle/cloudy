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
        class="text-sm select-none"
      >
        <template #format>
          <USettingPicklist
            v-model:model-value="settings.fallbackFormat.format as any"
            variant="link"
            :options="SETTINGS__METADATA.fallbackFormat.options"
            :disabled="!settings.fallbackFormat.enabled"
          />
        </template>
      </i18n-t>
    </div>

    <div class="pl-6 flex gap-2 items-center">
      <UCheckbox
        id="fallback-avoid-lq"
        v-model="settings.fallbackFormat.avoidLq"
        :disabled="!settings.fallbackFormat.enabled"
      />
      <ULabel for="fallback-avoid-lq" class="text-sm font-normal">
        {{ $t('settings.fallbackFormat.avoidLq') }}
      </ULabel>
    </div>
  </USettingRoot>
</template>
