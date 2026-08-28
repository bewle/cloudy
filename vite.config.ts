import { defineConfig } from 'vite-plus'

export default defineConfig({
  fmt: {
    arrowParens: 'avoid',
    ignorePatterns: ['.data/**', '.nitro/**', '.nuxt/**', '.output/**', 'dist/**'],
    quoteProps: 'consistent',
    semi: false,
    singleQuote: true,
    sortImports: true,
  },
  lint: {
    categories: {
      correctness: 'error',
      perf: 'warn',
      suspicious: 'warn',
    },
    ignorePatterns: ['.data/**', '.nitro/**', '.nuxt/**', '.output/**', 'coverage/**', 'dist/**'],
    jsPlugins: ['@e18e/eslint-plugin'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    plugins: ['oxc', 'typescript', 'unicorn', 'vue'],
    rules: {
      'e18e/prefer-array-at': 'error',
      'e18e/prefer-array-fill': 'error',
      'e18e/prefer-array-from-map': 'error',
      'e18e/prefer-array-some': 'error',
      'e18e/prefer-array-to-reversed': 'error',
      'e18e/prefer-array-to-sorted': 'error',
      'e18e/prefer-array-to-spliced': 'error',
      'e18e/prefer-date-now': 'error',
      'e18e/prefer-includes': 'error',
      'e18e/prefer-nullish-coalescing': 'error',
      'e18e/prefer-object-has-own': 'error',
      'e18e/prefer-regex-test': 'error',
      'e18e/prefer-spread-syntax': 'error',
      'e18e/prefer-static-regex': 'error',
      'e18e/prefer-string-fromcharcode': 'error',
      'e18e/prefer-timer-args': 'error',
      'e18e/prefer-url-canparse': 'error',
      'no-await-in-loop': 'off',
      'no-console': 'warn',
      'no-restricted-globals': 'error',
      'sort-keys': 'warn',
      'typescript/consistent-type-imports': 'error',
      'unicorn/no-array-sort': 'off',
      'vitest/require-mock-type-parameters': 'off',
    },
  },
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
  test: {
    include: ['test/**/*.{test,spec}.ts'],
  },
})
