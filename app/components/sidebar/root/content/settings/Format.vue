<script lang="ts" setup>
import { buttonStyles } from '~/components/u/Button.vue'

const metadata = SETTINGS__METADATA.preferredFormat
const formats = metadata.options

const settings = useSettings()
const modelValue = computed({
  get: () => settings.value.preferredFormat,
  set: (v: typeof settings.value.preferredFormat | undefined) => {
    if (v) settings.value.preferredFormat = v
  },
})
</script>

<template>
  <USettingRoot>
    <USettingLabel>{{ $t('settings.preferredFormat.title') }}</USettingLabel>

    <ToggleGroupRoot v-model:model-value="modelValue" class="flex flex-col gap-2" type="single">
      <ToggleGroupItem
        v-for="format in formats"
        :key="format"
        v-slot="{ pressed }"
        :value="format"
        :class="
          cn(
            buttonStyles({ variant: 'soft' }),
            'p-3 rounded border flex-col relative of-clip isolate group h-fit w-full justify-start items-start gap-2',
          )
        "
      >
        <div class="flex w-full items-center justify-between">
          <div class="flex gap-2 items-center">
            <span class="font-mono">{{ format }}</span>
            <UBadge
              v-if="isDefined(SC__TRANSCODING_RECOMMENDATIONS[format])"
              variant="soft"
              class="group-hover:bg-surface-raised-hover group-reka-active:bg-surface-raised-active!"
            >
              {{
                $t(`general.${SC__TRANSCODING_RECOMMENDATIONS[format] ? '' : 'not_'}recommended`)
              }}
            </UBadge>
          </div>

          <UCheckbox
            as="div"
            tabindex="-1"
            class="pointer-events-none z-1 group-hover:(border-border-strong bg-surface-hover) group-reka-active:(bg-surface-active! border-border-strong-active!)"
            :model-value="pressed"
          />
        </div>

        <p class="font-normal text-left max-w-3/4 text-pretty">
          {{ $t(`transcoding.description.${format}`) }}
        </p>

        <Icon
          :name="`format:${format}`"
          class="text-muted-foreground opacity-5 h-3/4 w-24 scale-200 top-1/2 absolute -translate-y-1/2 -right-4"
        />
      </ToggleGroupItem>
    </ToggleGroupRoot>
  </USettingRoot>
</template>
