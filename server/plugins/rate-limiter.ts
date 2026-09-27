export default defineNitroPlugin(async app => {
  const { rateLimitIpHeader } = useRuntimeConfig()
  if (!rateLimitIpHeader) return

  app.hooks.hook('nuxt-security:routeRules', rules => {
    for (const [route, rule] of Object.entries(rules)) {
      if (rule.rateLimiter)
        rules[route] = {
          ...rule,
          rateLimiter: { ...rule.rateLimiter, ipHeader: rateLimitIpHeader },
        }
    }
  })

  await app.hooks.callHook('nuxt-security:ready')
})
