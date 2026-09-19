export default defineNitroPlugin(async app => {
  if (import.meta.dev) return

  const { axiom, posthog } = useRuntimeConfig()

  if (axiom.apiKey && axiom.dataset)
    app.hooks.hook('evlog:drain', (await import('evlog/axiom')).createAxiomDrain(axiom))
  if (posthog.apiKey)
    app.hooks.hook('evlog:drain', (await import('evlog/posthog')).createPostHogDrain(posthog))
})
