<script lang="ts">
interface MainInputForm {
  url: string
  option: InputOption
}

export interface MainInputContext {
  form: Ref<MainInputForm>
  submitForm: () => void
  isDownloading: Ref<boolean>
}

export const [injectMainInputContext, provideMainInputContext] =
  createContext<MainInputContext>('MainInput')
</script>

<script lang="ts" setup>
const form = ref<MainInputForm>({
  option: 'track',
  url: 'https://soundcloud.com/pilarsierra/dewey-a2a',
})

const {
  execute: downloadTrack,
  pending: isDownloading,
  progress,
} = useTrackDownload(() => form.value.url)
const submitForm = () => {
  const x = downloadTrack()
}

provideMainInputContext({ form, isDownloading, submitForm })

const progressPercent = computed(() => progress.value * 100)
</script>

<template>
  <div
    class="relative w-main-input-w bg-surface rounded border border-border overflow-clip p-2 flex flex-col gap-2 has-focus:(border-border-active)"
  >
    <MainInputField />
    <MainInputOptions />

    <div
      class="bg-white h-full absolute inset-0"
      :style="{
        width: `${progressPercent}%`,
        display: isDownloading ? 'block' : 'none',
      }"
    />
  </div>
</template>
