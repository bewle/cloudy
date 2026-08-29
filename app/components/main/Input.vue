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
    class="p-2 border border-border rounded bg-surface flex flex-col gap-2 w-main-input-w relative overflow-clip has-focus:(border-border-active)"
  >
    <MainInputField />
    <MainInputOptions />

    <div
      class="bg-white h-full inset-0 absolute"
      :style="{
        width: `${progressPercent}%`,
        display: isDownloading ? 'block' : 'none',
      }"
    />
  </div>
</template>
