import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    '/node_modules/*',
    '/dist/*',
  ],
  type: 'lib',
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },
  typescript: true,
  vue: true,
}, {
  rules: {
    'vue/require-component-is': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'n/prefer-global/process': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'regexp/no-unused-capturing-group': ['error', {
      fixable: true,
    }],
    'vue/no-template-shadow': 'off',
    'no-console': 'off',
    'ts/no-unsafe-function-type': 'off',
    'import-x/order': [
      'error',
      {
        groups: [
          'index',
          'sibling',
          'parent',
          'internal',
          'external',
          'builtin',
          'object',
          'type',
        ],
      },
    ],
  },
})
