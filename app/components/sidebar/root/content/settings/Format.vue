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

    <ToggleGroupRoot class="flex flex-col gap-2" v-model:model-value="modelValue" type="single">
      <ToggleGroupItem
        v-for="format in formats"
        :key="format"
        :value="format"
        :class="
          cn(
            buttonStyles({ variant: 'soft' }),
            'p-3 rounded border flex-col relative of-clip isolate group h-fit w-full justify-start items-start gap-2',
          )
        "
        v-slot="{ pressed }"
      >
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-2">
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
            class="pointer-events-none z-1 group-hover:(bg-surface-hover border-border-strong) group-reka-active:(bg-surface-active! border-border-strong-active!)"
            :model-value="pressed"
          />
        </div>

        <p class="font-normal text-left max-w-3/4 text-pretty">
          {{ $t(`transcoding.description.${format}`) }}
        </p>

        <Icon
          :name="`format:${format}`"
          class="absolute -right-4 w-24 top-1/2 -translate-y-1/2 h-3/4 scale-200 opacity-5 text-muted-foreground"
        />
      </ToggleGroupItem>
    </ToggleGroupRoot>
  </USettingRoot>
</template>
