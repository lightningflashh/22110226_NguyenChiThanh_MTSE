import { defineConfig } from 'eslint-define-config'

export default defineConfig({
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    react: {
      version: '18.2'
    }
  },
  plugins: [
    'react',
    'react-hooks',
    'react-refresh'
  ],
  rules: {
    // React specific rules
    'react-refresh/only-export-components': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'react/display-name': 'off',

    // MUI specific rules
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@mui/*/*/*']
      }
    ],

    // General JS rules
    'no-console': 'warn',
    'no-extra-boolean-cast': 'off',
    'no-lonely-if': 'warn',
    'no-unused-vars': 'warn',
    'no-trailing-spaces': 'warn',
    'no-multi-spaces': 'warn',
    'no-multiple-empty-lines': 'warn',
    'space-before-blocks': ['error', 'always'],
    'object-curly-spacing': ['warn', 'always'],
    'indent': ['warn', 2],
    'semi': ['warn', 'never'],
    'quotes': ['error', 'single'],
    'array-bracket-spacing': 'warn',
    'linebreak-style': 'off',
    'no-unexpected-multiline': 'warn',
    'keyword-spacing': 'warn',
    'comma-dangle': 'warn',
    'comma-spacing': 'warn',
    'arrow-spacing': 'warn'
  }
})
