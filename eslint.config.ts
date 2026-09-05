import antfu from '@antfu/eslint-config'

export default antfu(
  {
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
  },
  {
    rules: {
      // oxfmt (vp fmt / vp check) self-closes void elements; match it so
      // `eslint --fix` and `vp fmt` don't fight over the trailing slash.
      'vue/html-self-closing': [
        'warn',
        { html: { component: 'always', normal: 'always', void: 'always' } },
      ],
    },
  },
)
