import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: false,
  ignores: ['.data/**', '.nitro/**', '.nuxt/**', '.output/**', 'dist/**'],
  imports: false,
  jsonc: false,
  perfectionist: false,
  pnpm: false,
  stylistic: false,
  unocss: true,
  vue: true,
  yaml: false,
})
