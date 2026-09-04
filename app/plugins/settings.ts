export default defineNuxtPlugin({
  parallel: true,
  setup: () => {
    const settings = useCookie<Settings>(SETTINGS__COOKIE_NAME, {
      default: () => SETTINGS__DEFAULT,
    })

    return {
      provide: { settings },
    }
  },
})
