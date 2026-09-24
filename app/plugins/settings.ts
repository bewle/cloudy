export default defineNuxtPlugin({
  parallel: true,
  setup: () => {
    const settings = useCookie<Settings>(SETTINGS__COOKIE_NAME, {
      default: () => SETTINGS__DEFAULT,
    })

    settings.value = toMerged(SETTINGS__DEFAULT, settings.value)

    return {
      provide: { settings },
    }
  },
})
