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
  autoDetect: Ref<boolean>
}

export const [injectMainInputContext, provideMainInputContext] =
  createContext<MainInputContext>('MainInput')
</script>

<script lang="ts" setup>
const form = ref<MainInputForm>({
  option: 'track',
  url: '',
})
const autoDetect = useCookie<boolean>('auto-detect', { default: () => true })

const { downloadTrack, isDownloading, progress, error } = useTrackDownload(() =>
  withoutTrailingSlash(form.value.url),
)
const sidebarState = useSidebarState()

const submitForm = () => {
  if (!isUrl(form.value.url)) {
    return (error.value = validationErrors.INVALID_URL({
      option: resolveInputSourceOption(form.value.option),
    }))
  }
  const url = withoutTrailingSlash(form.value.url)

  if (autoDetect.value) {
    const detectedType = getUrlType(url)
    if (detectedType) form.value.option = detectedType
  }

  error.value = undefined
  switch (form.value.option) {
    case 'track': {
      downloadTrack()
      break
    }
    case 'artist': {
      sidebarState.artist.value = url
      sidebarState.tab.value = 'artist'
      break
    }
    case 'playlist': {
      sidebarState.playlist.value = url
      sidebarState.tab.value = 'playlist'
      break
    }
    case 'multitrack': {
      sidebarState.multitrackList.add(url)
      sidebarState.tab.value = 'multitrack'
      break
    }
  }
}

provideMainInputContext({ autoDetect, error, form, isDownloading, submitForm })

const progressPercent = computed(() => progress.value * 100)
</script>

<template>
  <div class="gap-4 grid grid-rows-3">
    <div class="pb-2 flex items-end justify-center">
      <MainInputTitle />
    </div>

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

    <MainInputError />
  </div>
</template>
