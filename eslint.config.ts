import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: false,
  ignores: ['.data/**', '.nitro/**', '.nuxt/**', '.output/**', 'dist/**'],
  jsonc: false,
  pnpm: false,
  stylistic: false,
  unocss: true,
  vue: true,
  yaml: false,
})
