import { STORAGE__LOG_DRAIN_DATASET_NAME } from './shared/constants/storage'

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
  css: ['~/assets/css/globals.css', '~/assets/css/transitions.css'],
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
    families: [
      {
        display: 'swap',
        global: true,
        name: 'Monaspace Neon',
        src: '/fonts/monaspace-neon-100-900.woff2',
        weight: '100 900',
      },
    ],
  },
  future: {
    compatibilityVersion: 5,
  },
  i18n: {
    defaultLocale: 'en',
    experimental: {
      typedOptionsAndMessages: 'all',
    },
    locales: [{ code: 'en', file: 'en.json', language: 'en-US', name: 'English' }],
    strategy: 'no_prefix',
  },
  icon: {
    clientBundle: {
      scan: true,
    },
    collections: ['tabler', 'mingcute'],
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
    '@nuxt/test-utils',
    '@nuxt/image',
    '@nuxtjs/i18n',
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
  runtimeConfig: {
    axiom: {
      apiKey: '',
      dataset: STORAGE__LOG_DRAIN_DATASET_NAME,
    },
    posthog: {
      apiKey: '',
    },
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': ["'self'", 'data:', 'https://i1.sndcdn.com', 'https://a1.sndcdn.com'],
        'script-src': [
          "'self'",
          'https:',
          "'unsafe-inline'",
          "'strict-dynamic'",
          "'nonce-{{nonce}}'",
          "'wasm-unsafe-eval'",
        ],
      },
      crossOriginEmbedderPolicy: false,
    },
  },
})
