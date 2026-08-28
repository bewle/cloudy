export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        style: 'background-color: var(--color-background);',
      },
    },
  },
  colorMode: {
    storage: 'cookie',
  },
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/globals.css'],
  devtools: { enabled: true },
  evlog: {
    redact: true,
  },
  experimental: {
    asyncContext: true,
  },
  fonts: {
    defaults: {
      preload: true,
      weights: ['100 900'],
    },
  },
  future: {
    compatibilityVersion: 5,
  },
  imports: {
    dirs: [
      '~/utils/**/*.ts',
      '~/config/**/*.ts',
      '~/composables/**/*.ts',
      '~/constants/**/*.ts',
      '~~/shared/**/*.ts',
    ],
    presets: [
      { ignore: ['getQuery'], package: 'ufo' },
      { package: 'tailwind-variants' },
      { ignore: ['isEqual', 'isError'], package: 'es-toolkit' },
    ],
  },
  modules: [
    '@nuxt/icon',
    'nuxt-security',
    '@unocss/nuxt',
    'reka-ui/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    'evlog/nuxt',
  ],
  nitro: {
    imports: {
      dirs: ['./shared/**/*.ts'],
      presets: [
        { ignore: ['isEqual', 'isError'], package: 'es-toolkit' },
        { ignore: ['getQuery'], package: 'ufo' },
        {
          from: 'valibot',
          imports: [{ as: 'v', name: '*' }],
        },
      ],
    },
  },
})
