export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        style: 'background-color: var(--color-background);',
      },
    },
  },
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/globals.css'],
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 5,
  },
  fonts: {
    defaults: {
      preload: true,
      weights: ['100 900'],
    },
  },
  modules: [
    '@nuxt/icon',
    'nuxt-security',
    '@unocss/nuxt',
    'reka-ui/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/fonts',
    '@vueuse/nuxt',
  ],
  colorMode: {
    storage: 'cookie',
  },
  imports: {
    dirs: [
      '~/utils/**/*.ts',
      '~/config/**/*.ts',
      '~/composables/**/*.ts',
      '~/constants/**/*.ts',
      '~~/shared/**/*.ts',
    ],
    presets: [{ package: 'tailwind-variants' }],
  },
})
