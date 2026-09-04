<script lang="ts">
interface MainInputForm {
  url: string
  option: InputOption
}

export interface MainInputContext {
  form: Ref<MainInputForm>
  submitForm: () => void
  isDownloading: Ref<boolean>
  error: Ref<Error | undefined>
}

export const [injectMainInputContext, provideMainInputContext] =
  createContext<MainInputContext>('MainInput')
</script>

<script lang="ts" setup>
const form = ref<MainInputForm>({
  option: 'track',
  url: 'https://soundcloud.com/pilarsierra/dewey-a2a',
})

const { downloadTrack, isDownloading, progress, error } = useTrackDownload(() => form.value.url)

const submitForm = () => {
  if (!isUrl(form.value.url)) {
    return (error.value = validationErrors.INVALID_URL({ option: form.value.option }))
  }

  error.value = undefined
  return downloadTrack()
}

provideMainInputContext({ error, form, isDownloading, submitForm })

const progressPercent = computed(() => progress.value * 100)
</script>

<template>
  <div class="gap-2 grid grid-rows-3">
    <div aria-hidden="true" />

    <div
      class="p-2 border border-border rounded bg-surface flex shrink-0 flex-col gap-2 w-main-input-w relative overflow-clip has-focus:(border-border-active)"
    >
      <MainInputField />
      <MainInputOptions />

      <div
        class="bg-primary/10 h-full inset-0 absolute"
        :style="{
          width: `${progressPercent}%`,
          display: isDownloading ? 'block' : 'none',
        }"
      />
    </div>

    <MainInputError v-if="error" />
  </div>
</template>
