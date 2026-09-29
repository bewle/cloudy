type Props = Record<string, string | number | boolean>

const scriptOptions = { trigger: 'onNuxtReady' } as const

export default defineNuxtPlugin({
  parallel: true,
  setup: () => {
    const { plausibleAnalytics, posthog } = useRuntimeConfig().public.scripts
    const ph = posthog?.apiKey ? useScriptPostHog({ scriptOptions }) : undefined
    const pa = plausibleAnalytics?.scriptId
      ? useScriptPlausibleAnalytics({ scriptOptions })
      : undefined

    function track(event: keyof typeof ANALYTICS__EVENTS, props?: Props) {
      if (import.meta.env.DEV) return

      const name = ANALYTICS__EVENTS[event]
      ph?.proxy.posthog.capture(name, props)
      pa?.proxy.plausible(name, { props })
    }

    return {
      provide: { analytics: { track } },
    }
  },
})
