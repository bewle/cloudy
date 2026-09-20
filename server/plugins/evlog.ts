import { EvlogError } from 'evlog'
import type { H3Event } from 'h3'

export default defineNitroPlugin(async app => {
  app.hooks.beforeEach(ctx => {
    if (ctx.name !== 'error') return
    const [error, { event }] = ctx.args.slice(-2) as [{ cause?: unknown }, { event?: H3Event }]
    const original = EvlogError.isEvlogError(error) ? error : error.cause
    if (EvlogError.isEvlogError(original) && original.internal) event?.context.log?.error(original)
  })

  if (import.meta.dev) return

  const { axiom, posthog } = useRuntimeConfig()

  if (axiom.apiKey && axiom.dataset)
    app.hooks.hook('evlog:drain', (await import('evlog/axiom')).createAxiomDrain(axiom))
  if (posthog.apiKey)
    app.hooks.hook('evlog:drain', (await import('evlog/posthog')).createPostHogDrain(posthog))
})
