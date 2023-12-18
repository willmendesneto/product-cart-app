module.exports = {
  globals: {
    vi: true,
  },
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react-refresh', 'react', 'simple-import-sort', 'import', 'prettier'],
  rules: {
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
    // allow jsx syntax in js files (for next.js project)
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],

    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',

    'react-refresh/only-export-components': 'warn',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['..*', './*'],
            message:
              "Please import components using namespace directly. E.G: `import { MyComponent } from '@/<path-from-src-folder>'` instead of `import { MyComponent } from './<path-from-src-folder>'`",
          },
        ],
        paths: [
          {
            name: '@testing-library/react',
            importNames: ['render'],
            message: 'Please use `import { renderWithQueryProvider } from "@test/testUtils"` instead',
          },
        ],
      },
    ],

    'prefer-const': 'error',
    'no-duplicate-imports': ['error', { includeExports: false }],
    'no-dupe-keys': 'error',
    'no-implicit-coercion': 'error',
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'prettier/prettier': 'error',
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: true,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'no-restricted-properties': [
      2,
      {
        object: 'Object',
        property: 'create',
        message: 'Please use Object destructuring instead. E.G. `const data = {...defaultValues, newValue: true }`',
      },
    ],

    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', args: 'all' }],
    'react/destructuring-assignment': [
      'error',
      'always',
      { ignoreClassFields: false, destructureInSignature: 'always' },
    ],
  },
  overrides: [
    {
      files: ['!vite.config.ts'],
      rules: {
        'import/no-default-export': 'error',
      },
    },
    {
      files: ['!src/queries/*.ts'],
      rules: {
        'no-restricted-globals': [
          'error',
          {
            name: 'fetch',
            message: '`fetch()` usage is only allowed inside `@/queries` folder',
          },
        ],
      },
    },
    {
      files: ['!src/utils/storage.ts'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['use-local-storage-state'],
                message: '`use-local-storage-state` usage is only allowed inside `@/utils/storage` file',
              },
            ],
          },
        ],
      },
    },
  ],
};
