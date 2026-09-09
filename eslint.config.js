import { defineConfig } from '@eslint/config';
import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['tests/**/*.ts'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      playwright.configs['flat/recommended'],
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },
]);
