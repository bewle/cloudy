export default defineNuxtPlugin({
  parallel: true,
  setup: () => {
    const settings = useCookie<Settings>(SETTINGS__COOKIE_NAME, {
      default: () => SETTINGS__DEFAULT,
    })

    settings.value = merge(settings.value, SETTINGS__DEFAULT)

    return {
      provide: { settings },
    }
  },
})
