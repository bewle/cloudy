import { defineConfig } from 'vite-plus'

export default defineConfig({
  run: {
    tasks: {
      'lint:vue': {
        command: 'eslint .',
      },
      'lint:vue:fix': {
        command: 'eslint . --fix',
      },
    },
  },
  lint: {
    plugins: ['oxc', 'typescript', 'unicorn', 'vue'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: ['@e18e/eslint-plugin'],
    categories: {
      correctness: 'error',
      suspicious: 'warn',
      perf: 'warn',
    },
    ignorePatterns: ['.data/**', '.nitro/**', '.nuxt/**', '.output/**', 'coverage/**', 'dist/**'],
    rules: {
      'vitest/require-mock-type-parameters': 'off',
      'no-console': 'warn',
      'no-await-in-loop': 'off',
      'unicorn/no-array-sort': 'off',
      'no-restricted-globals': 'error',
      'typescript/consistent-type-imports': 'error',
      'sort-keys': 'error',
      'e18e/prefer-array-at': 'error',
      'e18e/prefer-array-fill': 'error',
      'e18e/prefer-includes': 'error',
      'e18e/prefer-array-to-reversed': 'error',
      'e18e/prefer-array-to-sorted': 'error',
      'e18e/prefer-array-to-spliced': 'error',
      'e18e/prefer-nullish-coalescing': 'error',
      'e18e/prefer-object-has-own': 'error',
      'e18e/prefer-spread-syntax': 'error',
      'e18e/prefer-url-canparse': 'error',
      'e18e/prefer-array-from-map': 'error',
      'e18e/prefer-timer-args': 'error',
      'e18e/prefer-date-now': 'error',
      'e18e/prefer-regex-test': 'error',
      'e18e/prefer-array-some': 'error',
      'e18e/prefer-static-regex': 'error',
      'e18e/prefer-string-fromcharcode': 'error',
    },
  },
  fmt: {
    ignorePatterns: ['.data/**', '.nitro/**', '.nuxt/**', '.output/**', 'dist/**'],
    semi: false,
    arrowParens: 'avoid',
    singleQuote: true,
    sortImports: true,
    quoteProps: 'consistent',
  },
  test: {
    include: ['test/**/*.{test,spec}.ts'],
  },
})
