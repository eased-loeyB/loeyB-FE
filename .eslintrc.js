module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'react-hooks/exhaustive-deps': 'warn',
        'import/order': [
          'error',
          {
            groups: [
              ['external', 'builtin'],
              'internal',
              ['sibling', 'parent'],
              'index',
            ],
            pathGroups: [
              {
                pattern: '@(react|react-native)',
                group: 'external',
                position: 'before',
              },
              {
                pattern: '~/**',
                group: 'internal',
              },
            ],
            pathGroupsExcludedImportTypes: ['internal', 'react'],
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
      },
    },
  ],
};
