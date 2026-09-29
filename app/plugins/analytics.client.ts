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

      ph?.proxy.posthog.capture(event, props)
      pa?.proxy.plausible(event, { props })
    }

    return {
      provide: { analytics: { track } },
    }
  },
})
