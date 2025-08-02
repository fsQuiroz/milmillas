import react from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config([
  globalIgnores(['**/build', '**/dist', '**/node_modules', '**/*.min.js', '**/coverage', 'fsq/**']),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      react.configs.flat.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],

    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'react-refresh/only-export-components': 'warn',

      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@mui/*/*/*'],
              message: 'Deep MUI imports are not allowed',
            },
            {
              group: ['../types/api/*', '../types/forms/*'],
              message: 'Use shorter import path via index files: import from "../types" instead',
            },
          ],
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
        },
      ],

      'react/react-in-jsx-scope': 'off',
    },
  },
]);
