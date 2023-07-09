module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'prettier',
  ],
  plugins: ['import', 'unused-imports', '@typescript-eslint', 'jest'],
  env: {
    'jest/globals': true,
    'es6': true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['~', './'],
        ],
        extensions: ['.ts', '.js', '.json'],
      },
    },
  },
  rules: {
    /* eslint */
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    /* typescript */
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    /* import */
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'unused-imports/no-unused-imports': 'error',
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        'pathGroupsExcludedImportTypes': ['builtin'],
        'newlines-between': 'always',
        'alphabetize': {
          order: 'asc',
        },
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['./*', '../*'],
      },
    ],
    /* jest */
    'jest/consistent-test-it': ['error', { fn: 'it' }],
  },
};
